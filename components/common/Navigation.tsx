const Navigation = () => {
  const LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Blog', path: '/blog' },
    { label: 'Shop', path: '/shop' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <div>
      {LINKS.map(link => (
        <p key={link.path}>{link.label}</p>
      ))}
    </div>
  )
}

export default Navigation
