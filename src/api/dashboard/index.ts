import { ResponseJson } from '@/config/request';
import { request } from '@/utils/request';

export interface TopFourProps {
  vN: number;
  vTN: number;
  oN: number;
  oTN: number;
  uN: number;
  uTn: number;
  pN: number;
  pTN: number;
}

export interface OtherOneProps {
  ld: number[];
  td: number[];
}

export interface OtherTwoProps {
  ld: number[];
  td: number[];
}

export interface OtherThreeProps {
  list: Array<{ value: number; name: string }>;
}

export interface OtherFourProps {
  list: Array<{ value: number; name: string }>;
}

export interface OtherFiveProps {
  ld: number[];
  td: number[];
}

export interface OtherSixProps {
  list: Array<number>;
}

export function getTopFour(): Promise<ResponseJson<TopFourProps>> {
  return request({
    url: '/dashboard/topFour',
    method: 'get'
  });
}

export function getOtherOne(): Promise<ResponseJson<OtherOneProps>> {
  return request({
    url: '/dashboard/otherOne',
    method: 'get'
  });
}

export function getOtherTwo(): Promise<ResponseJson<OtherTwoProps>> {
  return request({
    url: '/dashboard/otherTwo',
    method: 'get'
  });
}

export function getOtherThree(): Promise<ResponseJson<OtherThreeProps>> {
  return request({
    url: '/dashboard/otherThree',
    method: 'get'
  });
}

export function getOtherFour(): Promise<ResponseJson<OtherFourProps>> {
  return request({
    url: '/dashboard/otherFour',
    method: 'get'
  });
}

export function getOtherFive(): Promise<ResponseJson<OtherFiveProps>> {
  return request({
    url: '/dashboard/otherFive',
    method: 'get'
  });
}

export function getOtherSix(): Promise<ResponseJson<OtherSixProps>> {
  return request({
    url: '/dashboard/otherSix',
    method: 'get'
  });
}
