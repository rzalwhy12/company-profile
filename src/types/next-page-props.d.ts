declare module "next" {
    export type PageProps<
        // Ganti `{}` dengan Record<string, string | string[]>, karena params selalu string atau array of string
        Params extends Record<string, string | string[]> = Record<string, string | string[]>,
        // Ganti `{}` dengan Record<string, string | string[] | undefined>
        SearchParams extends Record<string, string | string[] | undefined> = Record<string, string | string[] | undefined>
    > = {
        params: Params;
        searchParams: SearchParams;
    };
}