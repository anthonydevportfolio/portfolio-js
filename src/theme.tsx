import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState
} from 'react';

export type Theme = 'dark' | 'light';
export type ThemePreference = Theme | 'system';

export const THEME_PREFERENCES: ThemePreference[] = ['system', 'light', 'dark'];
export const THEME_PREFERENCE_LABELS: Record<ThemePreference, string> = {
    system: 'System',
    light: 'Light',
    dark: 'Dark'
};

const THEME_STORAGE_KEY = 'portfolio-theme';

const readSavedThemePreference = (): ThemePreference | null => {
    try {
        const savedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
        return savedPreference === 'system' || savedPreference === 'dark' || savedPreference === 'light'
            ? savedPreference
            : null;
    } catch {
        return null;
    }
};

const getInitialThemePreference = (): ThemePreference => {
    if (typeof window === 'undefined') return 'system';
    return readSavedThemePreference() ?? 'system';
};

const getSystemTheme = (): Theme => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const saveThemePreference = (themePreference: ThemePreference) => {
    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    } catch {
        // The preference still applies for this visit when storage is unavailable.
    }
};

interface ThemeContextValue {
    theme: Theme;
    themePreference: ThemePreference;
    setThemePreference: (themePreference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [themePreference, setThemePreferenceState] = useState<ThemePreference>(getInitialThemePreference);
    const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
    const theme = themePreference === 'system' ? systemTheme : themePreference;

    const setThemePreference = useCallback((nextPreference: ThemePreference) => {
        saveThemePreference(nextPreference);
        setThemePreferenceState(nextPreference);
    }, []);

    useEffect(() => {
        const systemThemePreference = window.matchMedia('(prefers-color-scheme: light)');
        const syncWithSystem = (event: MediaQueryListEvent) => {
            setSystemTheme(event.matches ? 'light' : 'dark');
        };

        systemThemePreference.addEventListener('change', syncWithSystem);
        return () => systemThemePreference.removeEventListener('change', syncWithSystem);
    }, []);

    useLayoutEffect(() => {
        document.documentElement.dataset.portfolioTheme = theme;
    }, [theme]);

    const value = useMemo(
        () => ({ theme, themePreference, setThemePreference }),
        [setThemePreference, theme, themePreference]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) throw new Error('useTheme must be used within ThemeProvider');
    return themeContext;
};

export const ThemePreferenceIcon: FC<{ className?: string; preference: ThemePreference }> = ({
    className,
    preference
}) => {
    if (preference === 'system') {
        return (
            <svg aria-hidden='true' className={className} viewBox='0 0 20 20'>
                <rect height='9.25' rx='1.75' width='13.5' x='3.25' y='3.75' />
                <path d='M10 13v3.25M7.25 16.25h5.5' />
            </svg>
        );
    }

    if (preference === 'light') {
        return (
            <svg aria-hidden='true' className={className} viewBox='0 0 20 20'>
                <circle cx='10' cy='10' r='3.25' />
                <path d='M10 2.25v1.5M10 16.25v1.5M2.25 10h1.5M16.25 10h1.5M4.52 4.52l1.06 1.06M14.42 14.42l1.06 1.06M15.48 4.52l-1.06 1.06M5.58 14.42l-1.06 1.06' />
            </svg>
        );
    }

    return (
        <svg aria-hidden='true' className={className} viewBox='0 0 20 20'>
            <path d='M16.35 12.52A7 7 0 0 1 7.48 3.65a7 7 0 1 0 8.87 8.87Z' />
        </svg>
    );
};
