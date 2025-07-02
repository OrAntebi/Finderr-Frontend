import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { deepPurple } from '@mui/material/colors'
import { getInitials } from '../services/util.service'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
        },
    },
}))

export default function UserAvatar({ user, onAvatarClick = null, size = { width: 32, height: 32 }, dot = "dot", fontSize = "1rem" }) {
    const { imgUrl, fullname } = user
    const avatarSx = {
        width: `${size.width}px`,
        height: `${size.height}px`,
        bgcolor: !imgUrl ? deepPurple[500] : undefined,
        fontSize,
        '& img': {
            width: '100%',
            height: '100%',
        },
    }

    return (
        <Stack direction="row" spacing={2} className="user-avatar">
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant={dot}
            >
                <Avatar
                    alt={fullname}
                    src={imgUrl || undefined}
                    onClick={onAvatarClick}
                    sx={avatarSx}
                >
                    {!imgUrl && getInitials(fullname)}
                </Avatar>
            </StyledBadge>
        </Stack>
    )
}
