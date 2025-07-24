import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { gigService } from '../../services/gig'
import { uploadService } from '../../services/upload.service'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Autocomplete, TextField, Chip, CircularProgress } from '@mui/material'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import imageIcon from '../../assets/img/image-icon.svg'

export function DynamicForm({ activeStep, gigData, onChange, errors = {} }) {
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
                            'Gig Title',
                            "As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours."
                        )}
                        <GigTitleInput
                            value={gigData.title}
                            onChange={val => onChange('title', val)}
                            error={errors.title}
                        />
                    </section>

                    <section className="gig-category-container flex">
                        {label(
                            'Category',
                            'Choose the category and sub-category most suitable for your Gig.'
                        )}
                        <SelectCategory
                            value={gigData.category}
                            onChange={val => onChange('category', val)}
                            error={errors.category}
                        />
                    </section>

                    <section className="gig-tags-container flex">
                        {label(
                            'Search tags',
                            'Tag your Gig with buzz words that are relevant to the services you offer. Use all 5 tags to get found.'
                        )}
                        <TagInput
                            value={gigData.tags}
                            onChange={val => onChange('tags', val)}
                            error={errors.tags}
                        />
                    </section>
                </>
            )}

            {activeStep === 1 && (
                <>
                    <section className="gig-pricing-container flex column">
                        <PricingPackages
                            value={gigData.packages}
                            onChange={val => onChange('packages', val)}
                            error={errors.packages}
                        />
                    </section>
                </>
            )}

            {activeStep === 2 && (
                <>
                    <section className="gig-description-container flex column">
                        <DescriptionEditor
                            value={gigData.description}
                            onChange={val => onChange('description', val)}
                            error={errors.description}
                        />
                    </section>
                </>
            )}

            {activeStep === 3 && (
                <>
                    <section className="gig-gallery-container flex column">
                        <GalleryUploader
                            value={gigData.imgUrls}
                            onChange={val => onChange('imgUrls', val)}
                            error={errors.imgUrls}
                        />
                    </section>
                </>
            )}

        </form>
    )
}

export function GigTitleInput({ value, onChange, error }) {
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
        borderRadius: '8px'
    }

    const inputWrapperBorderStyle = {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#ab2d2d' : '#dadbdd'
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#ab2d2d' : '#b3b3b3'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#ab2d2d' : '#b3b3b3',
            borderWidth: '1px'
        }
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
            helperText={error || validation}
            error={Boolean(error)}
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

export function SelectCategory({ value, onChange, error }) {
    const categoryList = gigService.getCategoryList()

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
        fontStyle: 'normal'
    }

    const formControlStyle = {
        ...baseStyle,
        alignSelf: 'start',
        width: '100%',
        maxWidth: '320px',
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#ab2d2d' : '#dadbdd'
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#ab2d2d' : '#b3b3b3'
        },
        '& .MuiOutlinedInput-root.MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#ab2d2d' : '#b3b3b3',
            borderWidth: '1px'
        }
    }

    const selectStyle = {
        '& .MuiSelect-select': {
            ...baseStyle,
            textTransform: 'uppercase',
            padding: '10px',
            display: 'flex',
            alignItems: 'center'
        }
    }

    const menuItemStyle = {
        ...baseStyle,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        minHeight: '40px',
        '&.Mui-selected': {
            backgroundColor: 'transparent'
        },
        '&.Mui-selected:hover': {
            backgroundColor: '#eee'
        },
        '&:hover': {
            backgroundColor: '#eee'
        }
    }

    const validationStyle = {
        fontSize: '12px',
        color: error ? '#ab2d2d' : helperColor,
        marginBlockStart: '3px'
    }

    return (
        <FormControl sx={formControlStyle} error={Boolean(error)}>
            <Select
                value={value}
                onChange={e => onChange(e.target.value)}
                displayEmpty
                fullWidth
                inputProps={{ 'aria-label': 'select a category' }}
                renderValue={selected => {
                    if (!selected) return <em style={baseStyle}>Select a category</em>
                    return selected
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 150,
                            overflowY: 'auto',
                            marginBlockStart: '8px'
                        }
                    },
                    MenuListProps: {
                        disablePadding: true
                    },
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left'
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left'
                    },
                    disableScrollLock: true
                }}
                slotProps={{
                    root: {
                        sx: selectStyle
                    }
                }}
            >
                {categoryList.map(({ categoryRoute, categoryName }, idx) => (
                    <MenuItem
                        key={idx}
                        value={categoryRoute}
                        selected={false}
                        disableRipple
                        sx={menuItemStyle}
                    >
                        {categoryName}
                    </MenuItem>
                ))}
            </Select>

            <div style={validationStyle}>
                {error || helperText}
            </div>
        </FormControl>
    )
}

export function TagInput({ value = [], onChange, error }) {
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
                    `https://api.datamuse.com/words?sp=${input}*`,
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

    const onRemoveTag = index => {
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
            fontFamily: 'Macan-Regular',
            color: '#74767e'
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#ab2d2d' : '#dadbdd'
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#ab2d2d' : '#b3b3b3'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? '#ab2d2d' : '#b3b3b3',
            borderWidth: '1px'
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
            margin: 0
        },
        '& .MuiChip-deleteIcon': {
            margin: 0
        }
    }

    const validationStyle = {
        fontSize: '12px',
        color: error ? '#ab2d2d' : helperColor,
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
                slotProps={{
                    paper: {
                        sx: {
                            mt: '8px',
                            fontFamily: 'inherit',
                            color: '#74767e',
                            '& .MuiAutocomplete-listbox': {
                                maxHeight: 150,
                                padding: 0
                            },
                            '& .MuiAutocomplete-option': {
                                minHeight: 'auto',
                                lineHeight: 1.2,
                                padding: '8px 14px'
                            }
                        }
                    }
                }}
                renderValue={value =>
                    value.map((option, index) => (
                        <Chip
                            key={option}
                            label={option}
                            onClick={() => onRemoveTag(index)}
                            onDelete={() => onRemoveTag(index)}
                            deleteIcon={
                                <span
                                    style={{
                                        color: '#74767e',
                                        fontSize: '14px',
                                        lineHeight: 1,
                                        margin: 0
                                    }}
                                >
                                    ✕
                                </span>
                            }
                            sx={chipStyle}
                        />
                    ))
                }
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder={value.length >= 1 ? '' : 'Add a tag'}
                        error={Boolean(error)}
                        sx={{
                            '& .MuiInputBase-input::placeholder': { color: '#74767e', fontFamily: 'inherit', opacity: 1 }
                        }}
                        inputProps={{
                            ...params.inputProps,
                            disabled: value.length >= 5
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

            <div style={validationStyle}>
                {error || helperText}
            </div>
        </section>
    )
}

export function PricingPackages({ value = {}, onChange, error }) {
    const [activeTab, setActiveTab] = useState('basic')
    const [newFeature, setNewFeature] = useState('')
    const [localPackages, setLocalPackages] = useState(value)

    const packageTypes = [
        { key: 'basic', name: 'Basic', description: 'A basic package for starters' },
        { key: 'standard', name: 'Standard', description: 'A standard package with more features' },
        { key: 'premium', name: 'Premium', description: 'A premium package with all features' }
    ]

    const isComplete = (pkg) =>
        pkg?.packPrice?.toString().trim() &&
        pkg?.packDaysToMake?.toString().trim() &&
        pkg?.desc?.trim() &&
        Array.isArray(pkg?.features) &&
        pkg.features.length > 0

    const updatePackage = (packageType, field, newValue) => {
        const updated = {
            ...localPackages,
            [packageType]: {
                ...localPackages[packageType],
                [field]: newValue
            }
        }

        setLocalPackages(updated)

        const completePackages = {}
        for (const key in updated) {
            if (isComplete(updated[key])) {
                completePackages[key] = updated[key]
            }
        }

        onChange(completePackages)
    }

    const addFeature = (packageType) => {
        if (!newFeature.trim()) return

        const current = localPackages[packageType]?.features || []
        const updatedFeatures = [...current, newFeature.trim()]
        updatePackage(packageType, 'features', updatedFeatures)
        setNewFeature('')
    }

    const removeFeature = (packageType, featureIndex) => {
        const current = localPackages[packageType]?.features || []
        const updatedFeatures = current.filter((_, index) => index !== featureIndex)
        updatePackage(packageType, 'features', updatedFeatures)
    }

    const handleFeatureKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addFeature(activeTab)
        }
    }

    const activePackage = packageTypes.find(pkg => pkg.key === activeTab)
    const packageData = localPackages[activeTab] || {}

    return (
        <div className="pricing-packages">
            <div className="tabs-container">
                {packageTypes.map(({ key, name }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`tab-button ${activeTab === key ? 'active' : ''}`}
                        type="button"
                    >
                        {name}
                    </button>
                ))}
            </div>

            <div className="package-card">
                <div className="package-header">
                    {activePackage.name} Package
                </div>
                <p className="package-description">
                    {activePackage.description}
                </p>

                <div className="field-group">
                    <label>Price ($)</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={packageData.packPrice || ''}
                        onChange={(e) => updatePackage(activeTab, 'packPrice', Number(e.target.value))}
                        min="0"
                    />
                </div>

                <div className="field-group">
                    <label>Delivery Time (days)</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={packageData.packDaysToMake || ''}
                        onChange={(e) => updatePackage(activeTab, 'packDaysToMake', Number(e.target.value))}
                        min="1"
                    />
                </div>

                <div className="field-group">
                    <label>Description</label>
                    <textarea
                        placeholder="Describe what's included in this package"
                        value={packageData.desc || ''}
                        onChange={(e) => updatePackage(activeTab, 'desc', e.target.value)}
                    />
                </div>

                <div className="field-group">
                    <label>Features</label>

                    <div className="feature-input-container">
                        <input
                            type="text"
                            placeholder="Type a feature and press Enter"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            onKeyPress={handleFeatureKeyPress}
                            className="feature-input"
                        />
                        <button
                            type="button"
                            onClick={() => addFeature(activeTab)}
                            className="add-feature-button"
                            disabled={!newFeature.trim()}
                        >
                            Add
                        </button>
                    </div>

                    {packageData.features && packageData.features.length > 0 && (
                        <div className="features-list">
                            {packageData.features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <span className="feature-text">{feature}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(activeTab, index)}
                                        className="remove-button"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
    )
}

export function DescriptionEditor({ value, onChange, maxChars = 1200, error }) {
    const [charCount, setCharCount] = useState(() => {
        const tmp = document.createElement('div')
        tmp.innerHTML = value
        return (tmp.textContent || '').replace(/\n$/, '').length
    })
    useEffect(() => {
        const tmp = document.createElement('div')
        tmp.innerHTML = value
        setCharCount((tmp.textContent || '').replace(/\n$/, '').length)
    }, [value])
    const HIGHLIGHT = '#fff475'
    const handleChange = (content, delta, source, quillEditor) => {
        onChange(content)
        const realLength = quillEditor.getText().replace(/\n$/, '').length
        if (realLength <= maxChars) {
            setCharCount(realLength)
        } else {
            quillEditor.deleteText(maxChars, quillEditor.getLength())
            setCharCount(maxChars)
        }
    }
    const modules = {
        toolbar: {
            container: '#custom-toolbar',
            handlers: {
                highlightText() {
                    const quill = this.quill
                    const range = quill.getSelection()
                    if (!range || range.length === 0) return
                    const fmt = quill.getFormat(range)
                    const isOn = fmt.background === HIGHLIGHT
                    quill.format('background', isOn ? false : HIGHLIGHT)
                },
                list(value) {
                    const quill = this.quill
                    const range = quill.getSelection()
                    if (!range) return
                    quill.format('list', value)
                }
            }
        }
    }

    return (
        <div className="limited-quill-editor gig-description-container">
            <div id="custom-toolbar">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-highlightText" title="Highlight">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 426.667 426.667">
                        <polygon points="85.36,256 149.36,320 149.36,426.667 277.36,426.667 277.36,320 341.36,256 341.36,149.333 85.36,149.333"></polygon>
                        <polygon points="62.192,52.501 32.027,82.667 77.371,127.925 107.451,97.76"></polygon>
                        <polygon points="364.453,52.587 319.205,97.835 349.36,128 394.64,82.752"></polygon>
                        <rect x="192.027" y="0" width="42.667" height="64"></rect>
                    </svg>
                </button>
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
            </div>
            <ReactQuill theme="snow" value={value} onChange={handleChange} modules={modules} />
            <div className="description-count">
                {error && (
                    <div style={{ color: '#ab2d2d', fontSize: '12px' }}>
                        {error}
                    </div>
                )}
                <p>{charCount} / {maxChars} Characters</p>
            </div>
        </div>
    )
}

export function GalleryUploader({ value = [], onChange, error }) {
    const fileInputRef = useRef(null)
    const [isUploading, setIsUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)

    const handleFileInputClick = () => {
        if (value.length >= 3 || isUploading) return
        fileInputRef.current.click()
    }

    const handleFileChange = async (ev) => {
        const file = ev.target.files?.[0]
        if (!file || value.length >= 3) return
        await uploadImage(file)
        fileInputRef.current.value = null
    }

    const handleDrop = async (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setDragActive(false)
        if (value.length >= 3 || isUploading) return
        const file = ev.dataTransfer.files?.[0]
        if (file) await uploadImage(file)
    }

    const uploadImage = async (file) => {
        const fakeEvent = { target: { files: [file] } }
        setIsUploading(true)
        try {
            const uploaded = await uploadService.uploadImg(fakeEvent)
            onChange([...value, uploaded.url].slice(0, 3))
        } catch (err) {
            alert('Upload failed')
        } finally {
            setIsUploading(false)
        }
    }

    const handleRemove = (idx) => {
        const updated = [...value]
        updated.splice(idx, 1)
        onChange(updated)
    }

    const handleDragOver = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setDragActive(true)
    }

    const handleDragLeave = () => setDragActive(false)

    return (
        <div className="gallery-upload-container">
            <div className="gallery-header">
                <h4>Images <span>(up to 3)</span></h4>
                <p>Get noticed by the right buyers with visual examples of your services.</p>
            </div>

            <div
                className={`gallery-grid ${dragActive ? 'drag-active' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {value.map((imgUrl, idx) => (
                    <div className="gallery-box preview" key={idx}>
                        <a href={imgUrl} target="_blank" rel="noopener noreferrer">
                            <img src={imgUrl} alt={`preview-${idx}`} />
                        </a>
                        <button type="button" onClick={() => handleRemove(idx)} className="remove-btn">✕</button>
                    </div>
                ))}

                {value.length < 3 && (
                    <div className="gallery-box uploader" onClick={handleFileInputClick}>
                        {isUploading ? (
                            <div className="loader-spinner"></div>
                        ) : (
                            <div className="upload-content">
                                <img src={imageIcon} alt="upload icon" />
                                <p>Drag & drop a Photo<br /><span className="browse">Browse</span></p>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            hidden
                            onChange={handleFileChange}
                        />
                    </div>
                )}
            </div>

            {error && <p className="error-text">{error}</p>}
        </div>
    )
}