export default function Profile() {

    return <main>
        <div className="flex w-[1199px] flex-col justify-center items-start gap-8 shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)] mx-auto px-auto py-auto bg-white rounded-2xl">
            <div className="flex w-[1199px] flex-col justify-center items-start gap-8 px-[72px] py-[60px]">
                <div className="flex flex-row lg:max-w-[1055px] ml-18 justify-between items-start self-stretch">
                    <div className="flex-col gap-2">
                        <p className="text-[#8A8998] text-[20px] not-italic font-medium leading-[normal] tracking-[0.8px] uppercase">
                            Welcome back, sobhan
                        </p>
                        <p className="text-[#1F2B3D] text-[76px] not-italic font-bold leading-[76px] tracking-[-1.52px]">
                            Dashboard
                        </p>
                    </div>
                    <p className="flex justify-center items-center gap-[13px] px-[23px] py-4 rounded-md bg-gray-300">
                        Not Registered Yet
                    </p>
                </div>
                <div className="flex justify-between items-center self-stretch border-b-[rgba(138,137,152,0.30)] border-b border-solid">
                    <div className="flex flex-row gap-0">
                        <div className="flex justify-center items-center gap-2 px-6 py-5 border-b-2 border-b-[#9D6D9B] border-solid">
                            <img src="source/Profile.svg"/>
                            <a className="text-[#9D6D9B] text-xl not-italic font-semibold leading-[normal] tracking-[-0.2px]">Profile</a>
                        </div>
                        <div className="text-[#1F2B3D] flex justify-center items-center gap-2 px-6 py-5">
                            <img src="source/TicketStar.svg" />
                            <a className="text-[#1F2B3D] text-xl not-italic font-semibold leading-[normal] tracking-[-0.2px]">Registration</a>
                        </div>
                        <div className="flex justify-center items-center gap-2 px-6 py-5">
                            <img src="source/Play.svg" />
                            <a className="text-[#1F2B3D] text-xl not-italic font-semibold leading-[normal] tracking-[-0.2px]">Stream</a>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 px-6 py-5">
                        <img src="source/Logout.svg" />
                        <a className="text-[#E04545] text-xl not-italic font-semibold leading-[normal] tracking-[-0.2px]">Log out</a>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-5 self-stretch">
                    <label className="text-[#1F2B3D] text-4xl not-italic font-bold leading-[normal] tracking-[-0.72px]">Personal Info</label>
                    <div className="flex flex-col items-start gap-8 self-stretch">
                        <div className="flex items-start gap-6 self-stretch">
                            <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">EMAIL</label>
                                <p className="flex items-center gap-2 self-stretch px-5 py-4 rounded-lg bg-[#8A89981A]">sobhan@gmail.com</p>
                            </div>
                            <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">Phone Number</label>
                                <div className="flex items-start gap-[9px] self-stretch">
                                    <div className="flex items-center gap-3 border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                        <div className="w-8 h-6 rounded-sm bg-[#d9d9d9]"></div>
                                        <input className="w-[43px] text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]" type="text" id="areaCodeInput" pattern="[0-9]{3}" maxLength={4} defaultValue="+98"/>
                                    </div>
                                    <div className="flex items-center gap-2 flex-[1_0_0] border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                        <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]" type="text" id="phoneNumber" pattern="[0-9]{10}" minLength={10} maxLength={10} defaultValue={9123456789} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  className="flex items-start gap-6 self-stretch">
                        <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                            <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">First name</label>
                            <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]" type="text" id="fName" minLength={3} maxLength={15} defaultValue="Sobhan"/>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                            <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">Last name</label>
                            <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]" type="text" id="lName" minLength={3} maxLength={20} defaultValue="Aghasi Zadeh"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 self-stretch">
                        <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                            <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">CITY</label>
                            <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]" type="text" id="City" minLength={3} maxLength={15} defaultValue="Tehran"/>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                            <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">Birthday</label>
                            <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                <input className="black-text text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]" type="date" id="birthday" name="birthday"></input>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                            <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">Gender</label>
                            <div className="flex items-center gap-5 px-0 py-1">
                                <input type="radio" id="male" name="gender" value="male" className="w-3 h-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"/>
                                <label for="male" className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]">Male</label><br/>
                                <input type="radio" id="female" name="gender" value="female" className="w-3 h-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"/>
                                <label for="female" className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]">Female</label><br/>
                                <input type="radio" id="other" name="gender" value="other" className="w-3 h-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"/>
                                <label for="other" className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]">Other</label>
                            </div>
                        </div>
                    </div>
                    <hr className="w-[1055px] h-px bg-[#8A89984D]"></hr>
                    <div className="flex flex-col items-start gap-5 self-stretch">
                        <p className="text-[#1F2B3D] text-4xl not-italic font-bold leading-[normal] tracking-[-0.72px]">Professional Info</p>
                    </div>
                    <div className="flex flex-col items-start gap-8 self-stretch">
                        <div className="flex items-start gap-6 self-stretch">
                            <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">University</label>
                                <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                    <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px] min-w-full" type="text" id="University" minLength={5} maxLength={100} defaultValue="Sharif University of Technology"/>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">Major</label>
                                <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                    <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px] min-w-full" type="text" id="Major" minLength={5} maxLength={100} defaultValue="Computer Engineering"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-8 self-stretch">
                            <div className="flex h-[88px] flex-col items-start gap-[9px] flex-[1_0_0]">
                                <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">job</label>
                                <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                    <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px] min-w-full" type="text" id="Job" minLength={5} maxLength={100} defaultValue="Developer"/>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">Status</label>
                                <div className="flex items-center gap-2 px-0 py-1">
                                    <input type="checkbox" id="openToWork" name="openToWork" value="open" className="w-4 h-4 shrink-0"/>
                                    <label className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]">I’m open to work</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-[88px] flex-col items-start gap-[9px] self-stretch">
                            <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">Fields of interest</label>
                            <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                <select name="field" id="field" className="w-full">
                                    
                                </select>
                            </div>
                        </div>
                        <div className="flex items-start gap-6 self-stretch">
                            <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">grade</label>
                                <div className="flex items-center gap-5 px-0 py-1">
                                    <input type="radio" id="Bachelor" name="grade" value="Bachelor" className="w-3 h-3 shrink-0 fill-[var(--Primary-Color,#342B4C)] accent-purple"/>
                                    <label for="Bachelor" className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]">Bachelor</label><br/>
                                    <input type="radio" id="Master" name="grade" value="Master" className="w-3 h-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"/>
                                    <label for="Master" className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]">Master</label><br/>
                                    <input type="radio" id="PhD" name="grade" value="PhD" className="w-3 h-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"/>
                                    <label for="PhD" className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px]">PhD or Higher</label>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">Introduction Method</label>
                                <div className="flex justify-between items-center self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                    <select name="field" id="field" className="w-full">
                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-6 self-stretch">
                            <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">Linkedin</label>
                                <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                    <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px] w-full" type="text" id="linkedin" minLength={3} maxLength={100} defaultValue="linkedin.com/address"/>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">github</label>
                                <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                    <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px] w-full" type="text" id="github" minLength={3} maxLength={100} defaultValue="github.com/address"/>
                                </div>
                            </div>
                        </div>
                        <button className="flex h-[72px] justify-center items-center gap-2.5 self-stretch px-8 py-0 rounded-lg bg-[#342B4C] text-white text-xl not-italic font-bold leading-[normal] tracking-[-0.2px] mb-8">
                            Update Profile
                        </button>
                        <div className="flex flex-col items-start gap-5 self-stretch">
                            <label className="text-[#1F2B3D] text-4xl not-italic font-bold leading-[normal] tracking-[-0.72px]">Password Change</label>
                            <div className="flex items-start gap-6 self-stretch">
                                <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                    <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">Current Password</label>
                                    <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                        <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px] w-full" type="text" id="currentPass" minLength={3} maxLength={100}/>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                    <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">New Password</label>
                                    <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                        <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px] w-full" type="text" id="newPass" minLength={3} maxLength={100}/>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-[9px] flex-[1_0_0] self-stretch">
                                    <label className="text-[#8A8998] text-base not-italic font-medium leading-[normal] tracking-[0.64px] uppercase">confirm new Password</label>
                                    <div className="flex items-center gap-2 self-stretch border px-5 py-4 rounded-lg border-solid border-[rgba(138,137,152,0.30)]">
                                        <input className="text-[#1F2B3D] text-lg not-italic font-semibold leading-[normal] tracking-[-0.18px] w-full" type="text" id="confirmNewPass" minLength={3} maxLength={100}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="flex h-[72px] justify-center items-center gap-2.5 self-stretch px-8 py-0 rounded-lg bg-[#342B4C] text-white text-xl not-italic font-bold leading-[normal] tracking-[-0.2px] mb-8">
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
}