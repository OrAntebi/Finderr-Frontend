


export function DynamicForm({ activeStep }) {
    const [titleSuffix, setTitleSuffix] = useState('')

    return (
        <form className="dynamic-form">
            {activeStep === 0 && (
                <section className="gig-title-container flex">
                    <div className="flex column">
                        <label className="gig-title-label">Gig Title</label>
                        <p className="gig-title-p">As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
                    </div>

                    <GigTitleInput
                        value={titleSuffix}
                        onChange={setTitleSuffix}
                        maxLength={80}
                        name="gigTitle"
                    />
                </section>
            )}

            {activeStep === 1 && (
                <div>
                    <label>
                        Price:
                        <input type="number" name="price" required />
                    </label>
                </div>
            )}

            {activeStep === 2 && (
                <div>
                    <label>
                        Description:
                        <textarea name="description" required></textarea>
                    </label>
                </div>
            )}
        </form>
    )
}


import { useCallback, useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

const PREFIX = 'I will '
const MAX_LEN = 80
const MIN_LEN = 15

export default function GigTitleInput({ value = '', onChange, ...rest }) {
    const handleChange = useCallback(ev => {
        const full = ev.target.value.startsWith(PREFIX)
            ? ev.target.value
            : PREFIX + ev.target.value.replace(PREFIX, '')
        onChange(full.slice(PREFIX.length))
    }, [onChange])

    const tooShort = value.length < MIN_LEN
    const showError = tooShort && value.length > 0

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="do something Im really good at"
            value={value}
            onChange={handleChange}
            helperText={
                <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: '#ab2d2d' }}>{showError ? '15 characters minimum' : ''}</span>
                    <span>{value.length} / {MAX_LEN}</span>
                </span>
            }
            slotProps={{
                input: {
                    maxLength: MAX_LEN,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Typography component="span" fontWeight={700} fontFamily="inherit" color="#74767e">
                                I&nbsp;will
                            </Typography>
                        </InputAdornment>
                    )
                },
                root: {
                    sx: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            fontFamily: 'inherit',
                            fontWeight: 700,
                            border: '1px solid #dadbdd',
                            '& fieldset': { borderColor: '#95979d' },
                            '&:hover fieldset': { borderColor: '#95979d' },
                            '&.Mui-focused fieldset': { borderColor: '#95979d' }
                        }
                    }
                }
            }}
            error={showError}
            {...rest}
        />
    )
}
