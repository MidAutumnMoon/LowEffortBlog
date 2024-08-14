/**
 * Generate BrID from command line
 */

import { BrID } from "@lib/id.ts"

console.log( ( new BrID() ).text() )