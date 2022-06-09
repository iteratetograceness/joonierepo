import { getPlaiceholder } from 'plaiceholder'

const formatImages = async (image: string[]) => {
  const { base64, img } = await getPlaiceholder(image[0], { size: 9 })
  return { image: img, base64, caption: image[1] }
}

export default formatImages
