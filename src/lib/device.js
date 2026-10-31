export function getDeviceProfile() {
  if (typeof window === 'undefined') {
    return { mobile: false, lowPower: false, frameInterval: 0 }
  }

  const mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
  const memory = navigator.deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4
  const lowPower = mobile && (memory <= 2 || cores <= 4)

  return {
    mobile,
    lowPower,
    frameInterval: lowPower ? 1000 / 30 : mobile ? 1000 / 45 : 0,
  }
}
