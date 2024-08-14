import * as nanoid from "nanoid"


/**
 * Alphabet that excludes lookalike symbols.
 * Based on CyberAP/nanoid-dictionary `nolookalikes`
 */
const Alphabet = "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz"


/**
 * NanoID generator with custom alphabet and length
 */
const NanoID = nanoid.customAlphabet( Alphabet, 12 )



/**
 * ID used throughout Br, based on NanoID
 */
export class BrID {
    readonly #nanoid: string
    readonly #prefix: string

    /**
     * @param prefix AA
     */
    constructor( prefix?: string ) {
        this.#nanoid = NanoID()
        this.#prefix = prefix ? `${prefix}_` : ""
    }

    text(): string {
        return `${this.#prefix}${this.#nanoid}`
    }

    toString(): string {
        return this.text()
    }

    equals( other: BrID ): boolean {
        return this.text() === other.text()
    }
}