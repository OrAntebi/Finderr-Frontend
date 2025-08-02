import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'



export function AddGigStepper({ activeStep, maxStepReached, onStepClick }) {
    const steps = ['Gig Basics', 'Pricing', 'Description', 'Gallery', 'Review & Publish']
    
    const numPadSx = {
        padding: '0 0 1px 0'
    }

    return (
        <Box sx={{ width: '100%', fontFamily: 'inherit' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    columnGap: '40px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        rowGap: '2.1875rem',
                        flex: '1 1 auto',
                    }}
                >
                    {steps.map((label, idx) => {
                        const isDone = idx < activeStep
                        const isCurrent = idx === activeStep
                        const isClickable = idx <= maxStepReached

                        const circleBg = isDone || isCurrent ? '#1dbf73' : '#c5c6c9'
                        const textColor = isDone ? '#1dbf73' : isCurrent ? '#222325' : '#c5c6c9'

                        return (
                            <React.Fragment key={label}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: isClickable ? 'pointer' : 'default',
                                        flexWrap: 'nowrap',
                                        flexShrink: 0,
                                    }}
                                    onClick={isClickable ? () => onStepClick(idx) : undefined}
                                    tabIndex={isClickable ? 0 : -1}
                                    aria-disabled={!isClickable}
                                >
                                    <Box
                                        sx={{
                                            width: '25px',
                                            height: '25px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: circleBg,
                                            color: '#fff',
                                            fontSize: '0.875rem',
                                            fontWeight: 'bold',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {isDone ? (
                                            <Box
                                                component="svg"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                sx={{
                                                    width: '14px',
                                                    height: '14px',
                                                    fill: '#fff',
                                                }}
                                            >
                                                <path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z" />
                                            </Box>
                                        ) : (
                                            <Box component="span" sx={numPadSx}>
                                                {idx + 1}
                                            </Box>
                                        )}
                                    </Box>

                                    <Typography
                                        sx={{
                                            color: textColor,
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            marginInlineStart: '0.5rem',
                                            flexShrink: 0,
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        {label}
                                    </Typography>

                                    {idx < steps.length - 1 && (
                                        <Box
                                            sx={{
                                                mx: '1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexShrink: 0,
                                            }}
                                        >
                                            <ArrowForwardIosIcon
                                                sx={{
                                                    fontSize: '12px',
                                                    width: '12px',
                                                    height: '12px',
                                                    color: '#62646a',
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </React.Fragment>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}
