
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gigService } from '../../services/gig'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Autocomplete, TextField, Chip, CircularProgress } from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export function DynamicForm({ activeStep, gigData, onChange }) {

    const label = (labelValue, paragraphValue) => {
        return (
            <div className="label-container flex column">
                <label>{labelValue}</label>
                <p>{paragraphValue}</p>
            </div>
        )
    }

    return (
        <form className="dynamic-form flex column">
            {activeStep === 0 && (
                <>
                    <section className="gig-title-container flex">
                        {label(
                            "Gig Title",
                            "As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours."
                        )}

                        <GigTitleInput
                            value={gigData.title}
                            onChange={(val) => onChange('title', val)}
                        />
                    </section>

                    <section className="gig-category-container flex">
                        {label(
                            "Category",
                            "Choose the category and sub-category most suitable for your Gig."
                        )}

                        <SelectCategory
                            value={gigData.category}
                            onChange={(val) => onChange('category', val)}
                        />
                    </section>

                    <section className="gig-tags-container flex">
                        {label(
                            "Search tags",
                            "Tag your Gig with buzz words that are relevant to the services you offer. Use all 5 tags to get found."
                        )}

                        <TagInput
                            value={gigData.tags}
                            onChange={(val) => onChange('tags', val)}
                        />
                    </section>
                </>
            )}

            {activeStep === 2 && (
                <>
                    <section className="gig-description-container flex column">
                        < DescriptionEditor
                            value={gigData.description}
                            onChange={(val) => onChange('description', val)}
                        />
                    </section>
                </>
            )}
        </form>
    )
}

export function GigTitleInput({ value, onChange }) {
    const PREFIX = 'I will '
    const MAX_LEN = 80
    const MIN_LEN = 15

    const handleChange = useCallback(ev => {
        const full = ev.target.value.startsWith(PREFIX)
            ? ev.target.value
            : PREFIX + ev.target.value.replace(PREFIX, '')
        onChange(full.slice(PREFIX.length))
    }, [onChange])

    const { validation } = useValidation({
        value,
        minLen: MIN_LEN,
        maxLen: MAX_LEN,
        successMsg: 'Just perfect!',
        errorMsg: '15 characters minimum'
    })

    const baseStyle = {
        fontFamily: 'inherit',
        fontWeight: 700
    }

    const inputWrapperStyle = {
        ...baseStyle,
        height: '82px',
        alignItems: 'start',
        borderRadius: '8px',
    }

    const inputWrapperBorderStyle = {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#dadbdd',
        },

        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b3b3b3',
        },

        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b3b3b3',
            borderWidth: '1px',
        },
    }

    const inputStyle = {
        ...baseStyle,
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        paddingLeft: '40px',
        color: '#404145'
    }

    const adornmentStyle = {
        position: 'absolute',
        top: '16px',
        left: '14px'
    }

    const adornmentTextStyle = {
        ...baseStyle,
        color: '#74767e'
    }

    const formHelperStyle = {
        marginInline: 0
    }

    return (
        <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            placeholder="do something I'm really good at"
            value={value}
            className="gig-title-input"
            onChange={handleChange}
            helperText={validation}
            sx={inputWrapperBorderStyle}
            inputProps={{
                maxLength: MAX_LEN,
                style: inputStyle
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" style={adornmentStyle}>
                        <Typography component="span" style={adornmentTextStyle}>
                            I&nbsp;will
                        </Typography>
                    </InputAdornment>
                ),
                style: inputWrapperStyle
            }}
            FormHelperTextProps={{
                style: formHelperStyle
            }}
        />
    )
}

export function useValidation({
    value = '',
    minLen = 0,
    maxLen = 100,
    successMsg = '',
    errorMsg = ''
}) {
    const showSuccess = value.length >= minLen
    const showError = value.length > 0 && !showSuccess

    const helperColor = showError ? '#ab2d2d' : showSuccess ? '#1dbf73' : 'inherit'
    const helperText = showError
        ? errorMsg || `Minimum ${minLen} characters required`
        : showSuccess
            ? successMsg
            : ''

    const validation = useMemo(() => {
        const wrapperStyle = {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            margin: 0
        }
        const textStyle = {
            color: helperColor
        }

        return (
            <span style={wrapperStyle}>
                <span style={textStyle}>{helperText}</span>
                <span>{value.length} / {maxLen} max</span>
            </span>
        )
    }, [helperText, helperColor, value.length, maxLen])

    return {
        showError,
        showSuccess,
        validation,
        helperText,
        helperColor
    }
}

export function SelectCategory({ value, onChange }) {
    const categoryList = gigService.getCategoryList().map(item => item.categoryName)

    const { helperText, helperColor } = useValidation({
        value,
        minLen: 1,
        errorMsg: 'Category is required'
    })

    const baseStyle = {
        display: 'flex',
        alignItems: 'start',
        color: '#74767e',
        fontSize: '13px',
        fontFamily: 'Macan-Regular',
        fontStyle: 'normal',
    }

    const formControlStyle = {
        ...baseStyle,
        alignSelf: 'start',
        width: '100%',
        maxWidth: '320px',
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#dadbdd',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b3b3b3',
        },
        '& .MuiOutlinedInput-root.MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b3b3b3',
            borderWidth: '1px',
        },
    }

    const selectStyle = {
        '& .MuiSelect-select': {
            ...baseStyle,
            textTransform: 'uppercase',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
        }
    }

    const menuItemStyle = {
        ...baseStyle,
        textTransform: 'uppercase',
        '&.Mui-selected': {
            backgroundColor: 'transparent',
        },
        '&.Mui-selected:hover': {
            backgroundColor: '#eee',
        },
        '&:hover': {
            backgroundColor: '#eee',
        },
    }

    const validationStyle = {
        fontSize: '12px',
        color: helperColor,
        marginBlockStart: '3px'
    }

    return (
        <FormControl sx={formControlStyle}>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                displayEmpty
                fullWidth
                inputProps={{ 'aria-label': 'select a category' }}
                renderValue={(selected) => {
                    if (!selected) return <em style={baseStyle}>Select a category</em>
                    return selected
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 150,
                            overflowY: 'auto',
                            marginBlockStart: '8px',
                        }
                    },
                    MenuListProps: {
                        disablePadding: true
                    }
                }}
                slotProps={{
                    root: {
                        sx: selectStyle,
                    }
                }}
            >
                {categoryList.map((name, idx) => (
                    <MenuItem
                        key={idx}
                        value={name}
                        selected={false}
                        disableRipple
                        sx={menuItemStyle}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>

            <div style={validationStyle}>
                {helperText}
            </div>

        </FormControl>
    )
}

export function TagInput({ value = [], onChange }) {
    const [input, setInput] = useState('')
    const [suggestedTags, setSuggestedTags] = useState([])
    const [loading, setLoading] = useState(false)

    const { helperText, helperColor } = useValidation({
        value,
        minLen: 1,
        errorMsg: 'Tag list must contain at least 1 tag'
    })

    useEffect(() => {
        if (input.length < 2) return
        const controller = new AbortController()

        const fetchSuggestions = async () => {
            try {
                setLoading(true)
                const res = await fetch(
                    `https://api.datamuse.com/words?sp=${input}*&max=10`,
                    { signal: controller.signal }
                )
                const data = await res.json()
                const words = data.map(item => item.word).slice(0, 10)
                setSuggestedTags(words)
            } catch (err) {
                if (err.name !== 'AbortError') console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchSuggestions()
        return () => controller.abort()
    }, [input])

    const onAddTag = (_, newValue) => {
        const unique = [...new Set(newValue)].slice(0, 5)
        onChange(unique)
    }

    const onRemoveTag = (index) => {
        const updated = [...value]
        updated.splice(index, 1)
        onChange(updated)
    }

    const inputStyle = {
        textTransform: 'uppercase',
        width: '100%',
        '& .MuiOutlinedInput-root': {
            gap: '8px',
            paddingY: '8px',
            minHeight: '47px',
            flexWrap: 'wrap',
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#dadbdd',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b3b3b3',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b3b3b3',
            borderWidth: '1px',
        }
    }

    const chipStyle = {
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
        color: '#74767e',
        fontWeight: 600,
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        padding: '4px 8px',
        gap: '8px',
        fontFamily: 'Macan-Regular',
        '&:hover': {
            backgroundColor: '#f5f5f5'
        },
        '& .MuiChip-label': {
            padding: 0,
            margin: 0,
        },
        '& .MuiChip-deleteIcon': {
            margin: 0,
        }
    }

    const validationStyle = {
        fontSize: '12px',
        color: helperColor,
        marginBlockStart: '3px'
    }

    return (
        <section className="tags-container flex column">
            <Autocomplete
                multiple
                freeSolo
                options={input.length >= 2 ? suggestedTags : []}
                value={value}
                onChange={onAddTag}
                inputValue={input}
                onInputChange={(_, newInput) => {
                    if (value.length < 5) setInput(newInput)
                }}
                filterSelectedOptions
                loading={loading}
                sx={inputStyle}
                renderValue={(value) =>
                    value.map((option, index) => (
                        <Chip
                            key={option}
                            label={option}
                            onClick={() => onRemoveTag(index)}
                            onDelete={() => onRemoveTag(index)}
                            deleteIcon={
                                <span style={{
                                    color: '#74767e',
                                    fontSize: '14px',
                                    lineHeight: 1,
                                    margin: 0
                                }}>
                                    ✕
                                </span>
                            }
                            sx={chipStyle}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder={value.length >= 1 ? '' : 'Add a tag'}
                        inputProps={{
                            ...params.inputProps,
                            disabled: value.length >= 5,
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading && <CircularProgress color="inherit" size={16} />}
                                    {params.InputProps.endAdornment}
                                </>
                            )
                        }}
                    />
                )}
            />

            <div style={{ fontSize: '13px', color: '#6b6b6b', marginTop: '6px' }}>
                5 tags maximum. Type to get automatic suggestions.
            </div>

            <div style={validationStyle}>
                {helperText}
            </div>
        </section>
    )
}

export function DescriptionEditor({ value, onChange, maxChars = 1200 }) {
    const quillRef = useRef(null);
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();

            const handleTextChange = () => {
                const text = editor.getText();
                const realLength = text.replace(/\n$/, '').length;
                if (realLength > maxChars) {
                    editor.deleteText(maxChars, editor.getLength());
                } else {
                    setCharCount(realLength);
                }
            };

            editor.on('text-change', handleTextChange);
            handleTextChange();

            return () => {
                editor.off('text-change', handleTextChange);
            };
        }
    }, [maxChars]);

    const modules = {
        toolbar: {
            container: '#custom-toolbar'
        }
    };

    return (
        <div className="limited-quill-editor gig-description-container">
            <div id="custom-toolbar">
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-highlightText">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 426.667 426.667">
                        <polygon points="85.36,256 149.36,320 149.36,426.667 277.36,426.667 277.36,320 341.36,256 341.36,149.333 85.36,149.333"></polygon>
                        <polygon points="62.192,52.501 32.027,82.667 77.371,127.925 107.451,97.76"></polygon>
                        <polygon points="364.453,52.587 319.205,97.835 349.36,128 394.64,82.752"></polygon>
                        <rect x="192.027" y="0" width="42.667" height="64"></rect>
                    </svg>
                </button>
                <button class="ql-list" value="ordered"></button>
                <button class="ql-list" value="bullet"></button>
            </div>


            <ReactQuill
                ref={quillRef}
                value={value}
                onChange={onChange}
                modules={modules}
            />

            <div className="description-count">
                {charCount} / {maxChars} Characters
            </div>
        </div>
    );
}
