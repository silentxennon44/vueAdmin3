import axios from 'axios'
import { supabase } from '../'
import { authenticator } from 'otplib'
import QRCode from 'qrcode'
import * as speakeasy from 'speakeasy'
import i18n from '~/i18n'
import { UserInfo } from '#/store'
const { t } = i18n.global

export const supaCheckIfAccountExist = async (username = '', password = '') => {
    let { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
    return user as unknown as UserInfo[]
}

export const getAllDataFromTable = async (table = '') => {
    let { data, error } = await supabase.from(table).select()
    return data
}

export const getUserInfo = async (username) => {
    let { data, error } = await supabase.from(table).select()
    return data
}

export const getSecret = async (username = '', password = '') => {
    let { data, error } = await supabase
        .from('users')
        .select('google_secret')
        .eq('username', username)
        .eq('password', password)
    return data
}

function generateOTP(secret: string, timestamp = null) {
    console.log(secret, timestamp)
    const otp = speakeasy.totp({
        secret: secret,
        time: new Date().getSeconds() || undefined,
    })
    return otp
}

export const postSupabaseData = async (
    table = '',
    params: { username: string; password: string; google_secret: string }
) => {
    const { error } = await supabase
        .from(table)
        .insert([
            {
                name: params.username,
                username: params.username,
                password: params.password,
                user_level: 'user',
                status: 'active',
                is_new: true,
                google_secret: params.google_secret,
            },
        ])
        .select()

    return {
        error: error !== null,
        mess: error !== null ? t('entry.registerFailed') : t('entry.registerSuccess'),
    }
    // return {
    //   error: false,
    //   message: false? "Registration Failed!" : "Registration Succesful!",
    //   qrCode: false? "" : qr
    // }
}

export const checkIfValidGoogleAuthenticatorCode = (secret: string, otp: string) => {
    console.log(secret, otp, generateOTP(secret))
    if (!speakeasy.totp.verify({ secret: secret, encoding: 'base32', token: otp })) {
        return false
    }
    return true
}

export const generateQRcode = async (username = '') => {
    const secret = authenticator.generateSecret()
    const otp = authenticator.keyuri(username, 'Scratch Card APP (Back End)', secret)
    let imgLink = ''
    QRCode.toDataURL(otp, (err, imageUrl) => {
        if (err) {
            console.log('Could not generate QR code', err)
            return
        }
        imgLink = imageUrl
    })
    return {
        secret,
        imgLink,
    }
}
