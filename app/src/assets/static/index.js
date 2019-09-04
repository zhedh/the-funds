import {SWITCH} from '../../config'
import STATIC_XC from './xc'
import STATIC_NTTC from './nttc'

const STATIC = SWITCH.PROJECT === 'XC' ? STATIC_XC : STATIC_NTTC

const {COMMON, HOME, BARGAIN, AUTH, DEPOSIT, FOOTER} = STATIC

export {COMMON, HOME, BARGAIN, AUTH, DEPOSIT, FOOTER}
