#!/usr/bin/env node
import { cli } from '@custom-elements-manifest/analyzer/cli.js'

cli({ argv: process.argv, cwd: process.cwd(), noWrite: true })