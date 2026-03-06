declare module 'ammo.js' {
  interface AmmoFactory {
    (): Promise<any>
  }

  const Ammo: AmmoFactory
  export default Ammo
}


