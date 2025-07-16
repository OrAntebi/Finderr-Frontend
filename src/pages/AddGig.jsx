import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddGigStepper } from '../cmps/AddGigStepper'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { DynamicForm } from '../cmps/dynamicCmps/DynamicForm'
import { loadFromStorage, saveToStorage } from '../services/util.service'
import { addGig } from '../store/gig/gig.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'

export function AddGig() {
    const steps = ['Overview', 'Pricing', 'Requirements', 'Gallery', 'Summary']

    const [activeStep, setActiveStep] = useState(() => loadFromStorage('activeStep') || 0)
    const [maxStepReached, setMaxStepReached] = useState(() => loadFromStorage('maxStepReached') || 0)
    const [gigToSave, setGigToSave] = useState(() => gigService.getEmptyGig())
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        // resetForm()
    }, [])

    function resetForm() {
        setActiveStep(0)
        setMaxStepReached(0)
        setGigToSave(gigService.getEmptyGig())
        setErrors({})
        saveToStorage('activeStep', 0)
        saveToStorage('maxStepReached', 0)
    }

    function updateField(path, value) {
        setGigToSave(prev => {
            const updated = structuredClone(prev)
            const keys = path.split('.')
            if (keys.length === 1) {
                updated[path] = value
            } else {
                let curr = updated
                for (let i = 0; i < keys.length - 1; i++) curr = curr[keys[i]]
                curr[keys.at(-1)] = value
            }
            return updated
        })

        setErrors(prev => {
            const root = path.split('.')[0]
            if (!prev[root]) return prev
            const copy = { ...prev }
            delete copy[root]
            return copy
        })
    }

    async function onPublishGig() {
        console.log('Publishing gig:', gigToSave)
        try {
            const res = validateUpToStep(steps.length - 1, gigToSave)
            if (!res.ok) {
                setErrors(res.errors)
                setActiveStep(res.firstBadStep ?? 0)
                return
            }
            await addGig(gigToSave)
            showSuccessMsg('Gig published successfully!')
            navigate('/categories')
        } catch (err) {
            console.error(err)
            showErrorMsg('Failed to publish gig')
        }
    }

    function handleNext() {
        const res = validateUpToStep(activeStep, gigToSave)
        if (!res.ok) {
            setErrors(res.errors)
            setActiveStep(res.firstBadStep ?? activeStep)
            return
        }

        const next = activeStep + 1
        setActiveStep(next)
        saveToStorage('activeStep', next)
        setMaxStepReached(prev => {
            const newMax = Math.max(prev, next)
            saveToStorage('maxStepReached', newMax)
            return newMax
        })
    }

    function handleBack() {
        const prev = activeStep - 1
        setActiveStep(prev)
        saveToStorage('activeStep', prev)
    }

    function handleStepClick(stepIdx) {
        if (stepIdx > maxStepReached) return

        if (stepIdx > activeStep) {
            const res = validateUpToStep(activeStep, gigToSave)
            if (!res.ok) {
                setErrors(res.errors)
                setActiveStep(res.firstBadStep ?? activeStep)
                return
            }
        }

        setActiveStep(stepIdx)
        saveToStorage('activeStep', stepIdx)
    }

    return (
        <section className="add-gig full main-container">
            <div className="add-gig-stepper-container full main-container">
                <section className="add-gig-stepper">
                    <AddGigStepper
                        activeStep={activeStep}
                        maxStepReached={maxStepReached}
                        onStepClick={handleStepClick}
                    />
                </section>
            </div>

            <section className="add-gig-form-container">
                <DynamicForm
                    activeStep={activeStep}
                    gigData={gigToSave}
                    onChange={updateField}
                    errors={errors}
                />

                <section className="add-gig-stepper-btns flex align-center justify-end">
                    <Box sx={{ padding: 2, width: 'fit-content' }}>
                        <Box
                            sx={{
                                p: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 2
                            }}
                        >
                            {activeStep > 0 && (
                                <Button onClick={handleBack} sx={{ fontFamily: 'inherit' }}>
                                    Back
                                </Button>
                            )}
                            {activeStep === steps.length - 1 ? (
                                <Button onClick={onPublishGig} sx={{ fontFamily: 'inherit' }}>
                                    Publish Gig
                                </Button>
                            ) : (
                                <Button onClick={handleNext} sx={{ fontFamily: 'inherit' }}>
                                    Save & Continue
                                </Button>
                            )}
                        </Box>
                    </Box>
                </section>
            </section>
        </section>
    )
}

function htmlToText(html = '') {
    if (typeof document !== 'undefined') {
        const tmp = document.createElement('div')
        tmp.innerHTML = html
        const txt = tmp.textContent || tmp.innerText || ''
        return txt.replace(/\n$/, '')
    }
    return String(html).replace(/<[^>]*>/g, '').replace(/\n$/, '')
}

const STEP_RULES = {
    0: {
        title: { type: 'string', min: 15, msg: '15 characters minimum' },
        category: { type: 'string', required: true, msg: 'Category is required' },
        tags: { type: 'array', min: 1, msg: 'At least 1 tag required' }
    },
    1: {
        packages: { type: 'packages', required: true, msg: 'At least one package must be configured' }
    },
    2: {
        description: { type: 'htmlText', min: 30, msg: 'Description must be at least 30 characters' }
    }
}

const REQUIRED_STEPS = Object.keys(STEP_RULES).map(n => +n).sort((a, b) => a - b)

function validateStep(step, gigData) {
    const rules = STEP_RULES[step]
    if (!rules) return { ok: true, errors: {} }

    const errors = {}

    for (const field in rules) {
        const rule = rules[field]
        const rawVal = gigData?.[field]

        if (rule.type === 'array') {
            const arr = Array.isArray(rawVal) ? rawVal : []
            if (rule.required && arr.length === 0) errors[field] = rule.msg
            else if (rule.min != null && arr.length < rule.min) errors[field] = rule.msg
            continue
        }

        if (rule.type === 'htmlText') {
            const txt = htmlToText(rawVal || '')
            const len = txt.length
            if (rule.required && txt.trim().length === 0) errors[field] = rule.msg
            else if (rule.min != null && len < rule.min) errors[field] = rule.msg
            continue
        }

        if (rule.type === 'packages') {
            const packages = rawVal || {}
            const packageTypes = ['basic', 'standard', 'premium']
            let hasValidPackage = false

            for (const packageType of packageTypes) {
                const pkg = packages[packageType]
                if (
                    pkg &&
                    pkg.packPrice > 0 &&
                    pkg.packDaysToMake > 0 &&
                    pkg.desc &&
                    pkg.desc.trim().length > 0 &&
                    Array.isArray(pkg.features) &&
                    pkg.features.length > 0
                ) {
                    hasValidPackage = true
                    break
                }
            }

            if (rule.required && !hasValidPackage) {
                errors[field] = rule.msg
            }
            continue
        }

        const str = (rawVal ?? '').toString()
        const len = str.length
        if (rule.required && str.trim().length === 0) errors[field] = rule.msg
        else if (rule.min != null && len < rule.min) errors[field] = rule.msg
    }

    return { ok: Object.keys(errors).length === 0, errors }
}

function validateUpToStep(limitStep, gigData) {
    const errors = {}
    let firstBadStep = null

    for (const step of REQUIRED_STEPS) {
        if (step > limitStep) break
        const res = validateStep(step, gigData)
        if (!res.ok) {
            if (firstBadStep == null) firstBadStep = step
            Object.assign(errors, res.errors)
        }
    }

    return { ok: firstBadStep == null, errors, firstBadStep }
}