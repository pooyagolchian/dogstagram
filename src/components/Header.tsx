import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Header = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const header: any = document.getElementById('fixHeader')
    const sticky: any = header.offsetTop
    const scrollCallBack: any = window.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        header.classList.add('fixed')
      } else {
        header.classList.remove('fixed')
      }
    })
    return () => {
      window.removeEventListener('scroll', scrollCallBack)
    }
  }, [])
  return (
    <>
      <div
        id="fixHeader"
        className="header py-2 px-5 w-100 d-flex flex-row justify-content-between bg-white"
      >
        <div onClick={() => navigate('/')} className="col-auto cursor-pointer">
          <img className="header__logo" src="/img/happy.png" alt="logo" />
        </div>

        <div className="header__menu col-auto p-0 m-0">
          <ul className="col-auto">
            <li className="cursor-pointer" onClick={() => navigate('/')}>
              Timeline
            </li>
            <li
              className="cursor-pointer"
              onClick={() => navigate('/favorites')}
            >
              Favorites
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
