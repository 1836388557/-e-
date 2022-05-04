/**
 *
 * @param {*base64字符串} dataurl
 * @return {Blob文件类型}
 */
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','); var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 *
 * @param {*img标签的加载事件参数} img
 * @return {*处理最终结果返回图片base64编码} base64data
 *
 */
export function scaleimg(img) {
  const height = img.currentTarget.height
  const width = img.currentTarget.width
  let base64data = ''
  const can = document.createElement('canvas')
  can.height = height
  can.width = width
  const casimg = can.getContext('2d')
  casimg.clearRect(0, 0, width, height)
  casimg.drawImage(img.currentTarget, 0, 0, width, height)
  base64data = can.toDataURL('image/jpeg') // 获取在canvas元素中的图片截图base64编码
  const size = Math.round(dataURLtoBlob(base64data).size / 1024) // 获取压缩前的图片大小
  const maxsize = 800 // 设置压缩后的最大值
  if (size > maxsize) {
    if (size < 1300) {
      img.currentTarget.height = Math.round(height * (3 / 4))
      img.currentTarget.width = Math.round(width * (3 / 4))
      return scaleimg(img)
    } else if (size < 1800) {
      img.currentTarget.height = Math.round(height * (2 / 3))
      img.currentTarget.width = Math.round(width * (2 / 3))
      return scaleimg(img)
    } else {
      img.currentTarget.height = Math.round(height / 2)
      img.currentTarget.width = Math.round(width / 2)
      return scaleimg(img)
    }
  } else {
    console.log('压缩后大小' + size)
    return base64data
  }
}
