import { supabase } from '../'
import { authenticator } from 'otplib'
import QRCode from 'qrcode'
import i18n from '~/i18n'
const { t } = i18n.global

export const supaCheckIfAccountExist = async (username = '', password = '') => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
  return user
}

export const getDataFromTable = async (table = '', count = 10, from = 0) => {
  const { data, error } = await supabase
    .from(table)
    .select()
    .range(from, count - 1 - from)
  return data
}

export const getSecret = async (username = '', password = '') => {
  const { data, error } = await supabase
    .from('users')
    .select('google_secret')
    .eq('username', username)
    .eq('password', password)
  return data
}

export const supaCreateNewuser = async (table = '', params: { [key: string]: string }) => {
  const { error } = await supabase
    .from(table)
    .insert([
      {
        id: 1003,
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
}

export const supaUpdateIsNew = async (table = '', username = '') => {
  const { data, error } = await supabase.from(table).update({ is_new: false }).eq('username', username).select()

  return { data, error }
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

export const getColumns = async (table = '') => {
  const {
    data,
    error,
    data: { definitions },
  } = await supabase.from('').select()

  return Object.keys(definitions[table].properties)
}
