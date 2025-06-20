import type { LinkProps } from '@mui/material/Link';

import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled, useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = LinkProps & {
    isSingle?: boolean;
    disabled?: boolean;
};

export function Logo({
                         sx,
                         disabled,
                         className,
                         href = '/',
                         isSingle = true,
                         ...other
                     }: LogoProps) {
    const theme = useTheme();

    const singleLogo = (
        <svg width="218" height="52" viewBox="0 0 218 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_12942_91131)">
                <path d="M69.9273 34.533H57.1953V17.5429H69.9273V20.6486H60.3687V24.5574H69.5948V27.5453H60.3804V31.3656H69.939L69.9273 34.533Z" fill="black"/>
                <path d="M84.0908 17.5195H87.2991V34.5329H85.3076V34.5562L76.3685 23.0721V34.5341H73.1602V17.544H75.7607L84.0919 28.0815V17.5218L84.0908 17.5195Z" fill="black"/>
                <path d="M90.2617 34.533V17.5429H93.4468V34.533H90.2617Z" fill="black"/>
                <path d="M109.087 21.6953C107.904 20.624 106.367 20.0259 104.77 20.0143C101.127 20.0143 98.9169 22.7807 98.9169 26.2757C98.9169 29.0689 100.546 31.9566 104.77 31.9566C106.169 31.9927 107.532 31.5077 108.593 30.5961V27.5662H104.253V24.7007H111.54V31.8563C109.876 33.8638 107.377 34.9911 104.769 34.913C98.3802 34.913 95.7832 30.7103 95.7832 26.2477C95.7832 21.4645 98.7699 17.0474 104.769 17.0474C107.135 17.0474 109.404 17.9812 111.085 19.6459L109.086 21.6942L109.087 21.6953Z" fill="black"/>
                <path d="M128.987 22.2257L123.451 29.6074H122.816L117.391 22.2035V34.5597H114.188V17.566H117.881L123.2 24.8743L128.519 17.566H132.189V34.5597H128.981L128.989 22.2268L128.987 22.2257Z" fill="black"/>
                <path d="M147.282 31.3307H138.388L136.931 34.5319H133.447L141.095 17.5383H144.589L152.237 34.5319H148.738L147.281 31.3307H147.282ZM142.834 21.1114L139.676 28.3439H145.993L142.834 21.1114Z" fill="black"/>
                <path d="M165.825 32.1792C164.18 33.816 161.951 34.7323 159.631 34.7276C153.895 34.7276 150.91 30.7231 150.883 26.1346C150.856 21.5461 153.801 17.3469 159.631 17.3469C161.951 17.3446 164.178 18.2609 165.825 19.8953L164.926 20.6589C163.52 19.2611 161.614 18.4824 159.631 18.4964C154.661 18.4964 152.121 21.9926 152.148 26.0728C152.198 30.054 154.721 33.5 159.631 33.5C161.619 33.5024 163.527 32.7259 164.95 31.3375L165.825 32.178V32.1792Z" fill="#233D90"/>
                <path d="M181.665 34.5331L179.791 30.3572H169.64L167.793 34.5331H166.383L174.011 17.5394H175.444L183.092 34.5331H181.666H181.665ZM179.283 29.146L174.714 18.8031L170.152 29.146H179.283Z" fill="#233D90"/>
                <path d="M199.835 19.4373L193.336 29.3895H192.899L186.331 19.4373V34.5318H185.02V17.5417H186.572L193.072 27.445L199.511 17.5417H201.124V34.5318H199.836V19.4373H199.835Z" fill="#233D90"/>
                <path d="M206.179 28.6598V34.5318H204.867V17.5417H212.323C219.711 17.5417 219.711 28.6598 212.323 28.6598H206.179ZM206.179 18.7576V27.4718H212.323C217.987 27.4718 217.987 18.7576 212.323 18.7576H206.179Z" fill="#233D90"/>
                <path d="M36.2737 37.7994L37.8674 36.207C39.4704 34.6542 41.6311 33.809 43.863 33.8603C48.2509 33.9559 51.8862 30.4795 51.9831 26.095C52.0788 21.7105 48.5997 18.0779 44.2118 17.9811C44.0963 17.9788 43.9797 17.9788 43.8642 17.9811C41.6335 18.0441 39.4728 17.1977 37.8791 15.6344L36.2854 14.0419C34.7256 12.4401 33.8762 10.2799 33.9264 8.04631C33.9719 3.64897 30.4403 0.0466997 26.0385 6.83758e-05C21.6366 -0.0453972 18.0315 3.48226 17.9849 7.88077C17.9394 12.2793 21.4697 15.8815 25.8716 15.9282C25.9346 15.9282 25.9976 15.9282 26.0606 15.9282C28.2937 15.8629 30.4567 16.7092 32.0527 18.2702L33.6009 19.8545C35.1829 21.4855 36.0497 23.6783 36.0101 25.9492V26.018C36.0579 28.2901 35.1899 30.4865 33.6009 32.1127L32.1029 33.5676C30.4707 35.1484 28.2762 36.0158 26.0035 35.9785H25.9463C23.6713 36.0251 21.4744 35.1566 19.8469 33.5676L18.2835 32.0055C16.7295 30.4049 15.8848 28.247 15.9397 26.018C15.9875 21.6195 12.4583 18.0149 8.05643 17.9671C3.65688 17.9193 0.0495045 21.4458 0.000503974 25.8443C-0.0484966 30.2428 3.48188 33.8474 7.88376 33.8952C7.94443 33.8952 8.00509 33.8952 8.06576 33.8952C10.2988 33.8253 12.463 34.6705 14.0578 36.2338L15.6853 37.8601C17.2394 39.4618 18.0852 41.6209 18.0339 43.851C17.9382 48.2355 21.4172 51.8681 25.8051 51.9649C30.193 52.0605 33.8284 48.5841 33.9252 44.1996C33.9275 44.0842 33.9275 43.9676 33.9252 43.8522C33.8622 41.6011 34.7092 39.4199 36.2737 37.7994Z" fill="#233D90"/>
            </g>
            <defs>
                <clipPath id="clip0_12942_91131">
                    <rect width="217.862" height="51.9671" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
    return (
        <LogoRoot
            component={RouterLink}
            href={href}
            aria-label="Logo"
            underline="none"
            className={mergeClasses([logoClasses.root, className])}
            sx={[
                {
                    width: 40,
                    height: 40,
                    ...(!isSingle && { width: 102, height: 36 }),
                    ...(disabled && { pointerEvents: 'none' }),
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        > {singleLogo} </LogoRoot>
    );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
    flexShrink: 0,
    color: 'transparent',
    display: 'inline-flex',
    verticalAlign: 'middle',
}));