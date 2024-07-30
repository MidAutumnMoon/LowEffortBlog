export class BrDate {

    readonly year: string
    readonly month: string
    readonly day: string

    constructor( date: Date ) {
        const [ year, month, day ] = ( [
            date.getFullYear(),
            // Rubbish JS
            date.getMonth() + 1,
            date.getDate()
        ] as const )
            .map( p => p.toString() )
            .map( p => p.padStart( 2, "0" ) )

        this.year = year
        this.month = month
        this.day = day
    }


    static today(): BrDate {
        return new BrDate( new Date() )
    }

    static from_string( raw: string ): BrDate {
        return new BrDate( new Date(raw) )
    }


    same_date( other: BrDate ): boolean {
        return ( this.year === other.year )
            && ( this.month === other.month )
            && ( this.day === other.day )
    }


    toString(): string {
        const { year, month, day } = this
        return `${year}-${month}-${day}`
    }

    /**
     * Format date as "MM-DD" like "07-31"
     */
    to_mm_dd(): string {
        return `${this.month}-${this.day}`
    }

}
