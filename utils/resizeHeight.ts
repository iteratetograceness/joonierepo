const resizeHeight = () => {
  const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--height', `${window.innerHeight}px`)
  }

  window.addEventListener('resize', documentHeight)

  return () => window.removeEventListener('resize', documentHeight)
}

export default resizeHeight
