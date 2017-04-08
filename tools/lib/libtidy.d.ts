/**
 * TypeScript declaration file for libtidy v0.3
 * 
 * @author Wang Guan <momocraft@gmail.com>
 */

declare module 'libtidy' {
    export = LibTidyModule

    /**
     *  Callback convention
     */
    interface TidyResult {
        /**
         * errlog contains the error messages generated during the run,
         * formatted as a string including a trailing newline.
         */
        errlog?: string
        /**
         * contains the output buffer if output was generated.
         * The property is unset if generating output was not part of the method
         * in question, or null if no output was generated due to errors.
         */
        output?: Buffer
    }

    /**
     * The document is assumed to be a buffer or a string.
     * Anything else will be converted to a string and then turned into
     * a buffer.
     */
    type TidyDocument = string | Buffer | any

    module Options {


        type TidyOptionByName = string; //

        type TidyOptionByID = number; // 1 | 2

        /**
         * An available option
         */
        interface TidyOption {
            // TODO name, category, id, type, readOnly, default, pickList
        }

        type OptionKey = TidyOption | TidyOptionByName | TidyOptionByID
        type OptValue = any

        interface TidyOptionConstructor {
            new (): TidyOption
        }

        interface OptionDictionary {
            // TODO: everything
        }

    }

    /**
     * Callback convention for async APIs
     */
    interface TidyCB {
        (err: Error | null, res: TidyResult | null): void
    }

    /**
     * High-level functions automate the most common workflows.
     */
    module HighLevel {

        /**
         * The document is assumed to be a buffer or a string.
         * Anything else will be converted to a string and then
         * turned into a buffer.
         */
        interface TidyBufferStatic {
            (document: string, options: Options.TidyOption,
                callback: TidyCB): void

            (document: string, callback: TidyCB): void
        }
    }

    module BasicWorkflow {

        /**
         * Central object for dealing with the library at a low level
         */
        interface TidyDoc {
            optGet(key: Options.OptionKey): Options.OptValue
            optSet(key: Options.OptionKey, value: Options.OptValue): void
            options: Options.TidyOption

            // Sync calls
            parseBufferSync(document: TidyDocument): string
            cleanAndRepairSync(): string
            runDiagnosticsSync(): string
            saveBufferSync(): Buffer
            getErrorLog(): string

            // Async calls
            parseBuffer(document: TidyDocument, callback: TidyCB): void
            cleanAndRepair(callback: TidyCB): void
            runDiagnostics(callback: TidyCB): void
            saveBuffer(callback: TidyCB): void
        }

        /**
         * Constructor
         * (Can be used with `new` or normal call)
         */
        interface TidyDocConstructor {
            new (): TidyDoc
            (): TidyDoc
        }
    }

    // commonjs module returned by `require('libtidy')`
    module LibTidyModule {
        export const tidyBuffer: HighLevel.TidyBufferStatic
        export const TidyDoc: BasicWorkflow.TidyDocConstructor
        export const TidyOption: Options.TidyOptionConstructor
    }

    // TODO: a large module for options and possible values
}