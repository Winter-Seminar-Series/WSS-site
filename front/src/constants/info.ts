declare global {
    interface Window {
        BASE_URL: string;
    }
}

export const THIS_YEAR = 2020;
export const BASE_URL = window.BASE_URL;
