import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddGigStepper } from '../cmps/AddGigStepper'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { DynamicForm } from '../cmps/dynamicCmps/DynamicForm'
import { loadFromStorage, saveToStorage } from '../services/util.service'
import { addGig } from '../store/gig/gig.actions'
import { showSuccessMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'

export function AddGig() {
    const steps = ['Overview', 'Pricing', 'Requirements', 'Gallery', 'Summary']
    const [activeStep, setActiveStep] = useState(() => loadFromStorage('activeStep') || 0)
    const [maxStepReached, setMaxStepReached] = useState(() => loadFromStorage('maxStepReached') || 0)

    const [gigToSave, setGigToSave] = useState(() => gigService.getEmptyGig())

    const navigate = useNavigate()

    useEffect(() => {
        resetForm()
    }, [])


    function resetForm() {
        setActiveStep(0)
        setMaxStepReached(0)
        setGigToSave(gigService.getEmptyGig())
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
                for (let i = 0; i < keys.length - 1; i++) {
                    curr = curr[keys[i]]
                }
                curr[keys.at(-1)] = value
            }
            return updated
        })
    }



    async function onPublishGig() {
        try {
            // await addGig(gigToSave)
            console.log('gigToSave', gigToSave)
            showSuccessMsg('Gig published successfully!')
            // navigate('/categories')

        } catch (err) {
            console.error(err)
            showErrorMsg('Failed to publish gig')
        }
    }


    function handleNext() {
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
        if (stepIdx <= maxStepReached) {
            setActiveStep(stepIdx)
            saveToStorage('activeStep', stepIdx)
        }
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
                />

                <section className="add-gig-stepper-btns flex align-center justify-end">
                    <Box sx={{ padding: 2, width: 'fit-content' }}>
                        <Box
                            sx={{
                                p: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 2,
                            }}
                        >
                            {activeStep > 0 && (
                                <Button onClick={handleBack} sx={{ fontFamily: 'inherit' }}>Back</Button>
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
