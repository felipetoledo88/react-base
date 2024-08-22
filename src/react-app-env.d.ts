/// <reference types="react-scripts" />
declare module 'luxon';
declare module 'react-typical';
declare module 'js-cookie' {
    interface CookieAttributes {
        expires?: number | Date | undefined;
        path?: string | undefined;
        domain?: string | undefined;
        secure?: boolean | undefined;
        sameSite?: 'strict' | 'lax' | 'none' | undefined;
    }

    interface CookiesStatic<T> {
        defaults: CookieAttributes;
        set(name: string, value: string | object, options?: CookieAttributes): T;
        get(name: string): string | undefined;
        get(): { [key: string]: string };
        remove(name: string, options?: CookieAttributes): void;
    }

    const Cookies: CookiesStatic<CookiesStatic<{}>>;

    export default Cookies;
}
