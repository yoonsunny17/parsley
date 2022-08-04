import { useState } from "react"
import { Link } from 'react-router-dom'
import kakao_oauth from '../../Assets/kakao_login_large_narrow.png'
import Ddaywidget from "./Ddaywidget";
import Studywidget from "./Studywidget";

function Drawer({children}) { 
  
  const [isLogin, setIsLogin] = useState(false)
  const onClick = () => setIsLogin((current) => !current);
  console.log(isLogin)

  const userSley = 10000
  const user = '유교보이'

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
          {children}
        <label htmlFor="my-drawer-4" className="drawer-button ">
          <i className="bx bx-menu"></i>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay "></label>
        {isLogin ? 
          <div className="menu px-[24px] py-[36px] overflow-y-auto w-[380px] bg-base-100 text-base-content rounded-[30px_0_0_30px]">
            {/* <!-- Sidebar content here --> */}
            <div className="flex items-center justify-between mb-[10px]">
              <div className="font-bold text-[24px]">{userSley} <span className="font-normal">SLEY</span></div>
              <div className="text-[56px] text-sub1"><i className='bx bxs-user-circle'></i></div>
            </div>
            <div className="text-font1 font-bold text-[24px] mb-[25px]">
              <div>
                {user} 님 <br />
                항상 잘 하고 있어요!
              </div>
            </div>
            <div className="mb-[25px]">
              <Link to="/mypage">
                <button className="rounded-[50px] border-none text-font3 font-bold mr-[10px] px-[14px] py-[8px] bg-gradient-to-r from-[#628D54]  to-[#333]">마이페이지</button>
              </Link>
              <button onClick={onClick} className="rounded-[50px] border-none text-font3 font-bold mr-[10px] px-[14px] py-[8px] bg-gradient-to-r from-[#628D54]  to-[#333]">로그아웃</button>
            </div>
            {/* ========위젯========= */}
            <Ddaywidget />
            <Studywidget />
          </div> 
        :
          <div className="menu p-4 overflow-y-auto w-[380px] bg-base-100 text-base-content rounded-[30px_0_0_30px]">
            <div className="flex justify-end mt-[40px] mr-[30px] text-[60px] text-sub1 mb-[30px]"><i className='bx bxs-user-circle'></i></div>
            <div className="text-center text-[32px] font-bold text-font1 mb-[10px] font-basic">로그인</div>
            <div className="text-ceter text-[18px] font-normal text-[rgb(104_103_103)] mb-[60px]">Lorem Ipsum, dolor sit amet consectetur</div>
            <div className="flex my-[0px] mx-[60px] cursor-pointer">
              <div type="button" onClick={onClick}>
                <img src={kakao_oauth} alt="카카오" className="kakao" />  
              </div>
            </div>
          </div>
        }
        
      </div>
    </div>
  )
}

export default Drawer