import { useState } from 'react'
import { AddGigStepper } from '../cmps/AddGigStepper'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { DynamicForm } from '../cmps/dynamicCmps/DynamicForm'

export function AddGig() {
    const [activeStep, setActiveStep] = useState(0)
    const [maxStepReached, setMaxStepReached] = useState(0)
    const steps = ['Overview', 'Pricing', 'Description & FAQ', 'Requirements', 'Gallery', 'Publish']

    const handleNext = () => {
        const next = activeStep + 1
        setActiveStep(next)
        setMaxStepReached(prev => Math.max(prev, next))
    }

    const handleBack = () => {
        setActiveStep(prev => prev - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
        setMaxStepReached(0)
    }

    return (
        <section className="add-gig full main-container">
            <div className="add-gig-stepper-container full main-container">
                <section className="add-gig-stepper">
                    <AddGigStepper
                        activeStep={activeStep}
                        maxStepReached={maxStepReached}
                        onStepClick={setActiveStep}
                    />
                </section>
            </div>

            <section className="add-gig-form-container">
                <DynamicForm activeStep={activeStep} />
            </section>



            <section className="add-gig-stepper-btns">
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
                            <Button onClick={handleReset} sx={{ fontFamily: 'inherit' }}>Reset</Button>
                        ) : (
                            <Button onClick={handleNext} sx={{ fontFamily: 'inherit' }}>Next</Button>
                        )}
                    </Box>
                </Box>
            </section>
        </section>

    )
}
