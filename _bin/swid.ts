/**
 * Generate SwID from command line
 */

import { SwID } from "@lib/id.ts"

console.log( ( new SwID() ).text() )