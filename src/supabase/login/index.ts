import axios from 'axios';
import { supabase } from '../'
// import { authenticator } from 'otplib';
import QRCode from 'qrcode';

import * as speakeasy from 'speakeasy';

export const supaCheckIfAccountExist = async (username='', password='') => {
  let { data: user, error } = await supabase
  .from('users')
  .select('*')
  .eq('username', username)
  .eq('password', password)
  return user
}

export const getAllDataFromTable = async (table='') => {
  let { data, error } = await supabase
  .from(table)
  .select()
  return data
}

export const getUserInfo = async (username) => {
  let { data, error } = await supabase
  .from(table)
  .select()
  return data
}

export const getSecret = async (username='', password='') => {
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
    time:  new Date().getSeconds() || undefined,
  });
  return otp;
}

export const postSupabaseData = async (table='', params: { username: string; password: string }) => {
  const secret = speakeasy.generateSecret({
    name: 'Scratch Game BE: '+ params.username,
    length: 20,
  })

    console.log(secret, secret.otpauth_url)

    sessionStorage.setItem('newQr', await QRCode.toDataURL(secret.otpauth_url as string))

  const qr = await QRCode.toDataURL(secret.otpauth_url as string);

  const { error } = await supabase
    .from(table)
    .insert([
      { name: params.username,
        username: params.username,
        password: params.password,
        user_level: 'user',
        status: 'active',
        is_new: true,
        google_secret: secret.base32,
      },
    ])
    .select()

  return {
    error: error!==null,
    message: error!==null? "Registration Failed!" : "Registration Succesful!",
    qrCode: error!==null? "" : qr
  }
  // return {
  //   error: false,
  //   message: false? "Registration Failed!" : "Registration Succesful!",
  //   qrCode: false? "" : qr
  // }
}

export const checkIfValidGoogleAuthenticatorCode = (secret:string, otp:string) => {
  console.log(secret, otp, generateOTP(secret))
 if (!speakeasy.totp.verify({ secret: secret, encoding: 'base32', token: otp })) {
  return false
}
  return true
}
