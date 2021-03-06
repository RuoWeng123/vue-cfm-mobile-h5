export default function (obj, str) {
  const reg = new RegExp(`^\\${ str }`)
  return Object.keys(obj).reduce((results, item) => {
    if (reg.test(item)) {
      results[item.replace(reg, "")] = obj[item]
    }
    return results
  }, {})
}
