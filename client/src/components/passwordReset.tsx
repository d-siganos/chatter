import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const PasswordReset = () => {
	const { resetPassword } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>('');
	const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let email = emailRef.current?.value;
    
		try {
			setMessage("")
			setError("");
			setLoading(true);

			await resetPassword(email);

			setMessage("Check your inbox for further instructions")
		} catch {
			setError("Failed to reset password");
		}
  }

	return (
		<div>
			<div className="relative min-h-screen flex">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover relative">
					<div className="absolute inset-0 z-0">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1920" height="927" preserveAspectRatio="xMidYMid" viewBox="0 0 1920 927">
                <g transform="translate(960,463.5) scale(1,1) translate(-960,-463.5)">
                  <linearGradient id="lg-0.9149776758815551" x1="0" x2="1" y1="0" y2="0">
                    <stop stopColor="#4f46e5" offset="0"></stop>
                    <stop stopColor="#3b82f6" offset="1"></stop>
                  </linearGradient>
                  <path d="" fill="url(#lg-0.9149776758815551)" opacity="0.4">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite" keyTimes="0;0.333;0.667;1" calcMode="spline" keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1" begin="0s" values="M0 0L 0 880.8697484263149Q 192 808.6980903850932  384 767.7682819564011T 768 742.5247393807945T 1152 615.899765788017T 1536 572.3379757822537T 1920 429.91148893354443L 1920 0 Z;M0 0L 0 875.7525953900621Q 192 756.0865008728164  384 713.8884843378523T 768 640.511778659133T 1152 611.1181971925653T 1536 572.1991656981281T 1920 410.2110358457812L 1920 0 Z;M0 0L 0 847.9173699230618Q 192 844.176701238003  384 815.3475896263125T 768 666.9053041542468T 1152 568.6754449478997T 1536 520.1129244120045T 1920 355.7523236288457L 1920 0 Z;M0 0L 0 880.8697484263149Q 192 808.6980903850932  384 767.7682819564011T 768 742.5247393807945T 1152 615.899765788017T 1536 572.3379757822537T 1920 429.91148893354443L 1920 0 Z"></animate>
                  </path>
                  <path d="" fill="url(#lg-0.9149776758815551)" opacity="0.4">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite" keyTimes="0;0.333;0.667;1" calcMode="spline" keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1" begin="-2s" values="M0 0L 0 858.6776235043981Q 192 758.302422374249  384 722.659653423671T 768 631.8075008561525T 1152 623.3157981072895T 1536 528.4628111026507T 1920 324.2699354436161L 1920 0 Z;M0 0L 0 772.681722909191Q 192 852.2644348747333  384 820.6604911186332T 768 637.6302362412978T 1152 645.2296071723031T 1536 446.08227066083816T 1920 313.90694018260933L 1920 0 Z;M0 0L 0 779.7712044621927Q 192 689.596897668238  384 670.9805920580748T 768 690.0366635754166T 1152 504.99125457778484T 1536 413.1194158045525T 1920 413.6685882269359L 1920 0 Z;M0 0L 0 858.6776235043981Q 192 758.302422374249  384 722.659653423671T 768 631.8075008561525T 1152 623.3157981072895T 1536 528.4628111026507T 1920 324.2699354436161L 1920 0 Z"></animate>
                  </path>
                  <path d="" fill="url(#lg-0.9149776758815551)" opacity="0.4">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite" keyTimes="0;0.333;0.667;1" calcMode="spline" keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1" begin="-4s" values="M0 0L 0 791.8333060247695Q 192 838.4858413627464  384 822.0489818072062T 768 566.7980372366036T 1152 516.2938424689846T 1536 443.58561799724316T 1920 329.0332450057553L 1920 0 Z;M0 0L 0 809.5013708878166Q 192 846.9837847796208  384 830.5462567595923T 768 691.5048104431403T 1152 531.9498601306998T 1536 511.3978346705486T 1920 428.9974857899007L 1920 0 Z;M0 0L 0 895.6939492080278Q 192 841.6291042007987  384 812.8609889684782T 768 653.6562950872087T 1152 661.0255011757242T 1536 483.1368805582693T 1920 423.7854991783621L 1920 0 Z;M0 0L 0 791.8333060247695Q 192 838.4858413627464  384 822.0489818072062T 768 566.7980372366036T 1152 516.2938424689846T 1536 443.58561799724316T 1920 329.0332450057553L 1920 0 Z"></animate>
                  </path>
                  <path d="" fill="url(#lg-0.9149776758815551)" opacity="0.4">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite" keyTimes="0;0.333;0.667;1" calcMode="spline" keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1" begin="-6s" values="M0 0L 0 911.5611260142525Q 192 756.7100086905189  384 738.187099218016T 768 718.155059897043T 1152 495.61149635277764T 1536 386.1724632225625T 1920 337.55092375328036L 1920 0 Z;M0 0L 0 905.1268091546203Q 192 774.8334747876575  384 755.8172818475834T 768 580.2255612084639T 1152 551.1522830831647T 1536 505.33692408166667T 1920 333.90872419362796L 1920 0 Z;M0 0L 0 885.117282890863Q 192 859.3921375999166  384 817.4785379140329T 768 629.9912737518569T 1152 588.6679425785464T 1536 475.7754833301731T 1920 409.1074301729227L 1920 0 Z;M0 0L 0 911.5611260142525Q 192 756.7100086905189  384 738.187099218016T 768 718.155059897043T 1152 495.61149635277764T 1536 386.1724632225625T 1920 337.55092375328036L 1920 0 Z"></animate>
                  </path>
                  <path d="" fill="url(#lg-0.9149776758815551)" opacity="0.4">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite" keyTimes="0;0.333;0.667;1" calcMode="spline" keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1" begin="-8s" values="M0 0L 0 887.5610285975918Q 192 710.3351706695871  384 670.7196353700385T 768 699.6018715252367T 1152 662.6433450229113T 1536 493.27945088026877T 1920 329.02248798859966L 1920 0 Z;M0 0L 0 871.9729386379677Q 192 713.0481918513141  384 694.9967638901451T 768 676.5186206582556T 1152 571.5469397391131T 1536 556.1807407313697T 1920 414.7803502616072L 1920 0 Z;M0 0L 0 880.1184878804323Q 192 863.3765917011326  384 823.8768270836633T 768 618.8200092403109T 1152 638.1999243455448T 1536 422.67473998929495T 1920 361.28932200594255L 1920 0 Z;M0 0L 0 887.5610285975918Q 192 710.3351706695871  384 670.7196353700385T 768 699.6018715252367T 1152 662.6433450229113T 1536 493.27945088026877T 1920 329.02248798859966L 1920 0 Z"></animate>
                  </path>
                </g>
              </svg>
            </div>
            <div className="w-full  max-w-md z-10">
              <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">Chatter</div>
              <div className="sm:text-sm xl:text-md text-gray-200 font-normal">Encrypted chatting made easy</div>
            </div>
          </div>
          <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">Forgot your password?</h2>
                <p className="mt-2 text-sm text-gray-500">No harm done. Reset it here</p>
              </div>
              {
                error && <div className="p-2 text-center">
                            <div className="inline-flex items-center bg-white leading-none text-pink-600 rounded-full p-2 shadow text-teal text-sm">
                              <span className="inline-flex bg-red-600 text-white rounded-full h-6 px-3 justify-center items-center">Oops!</span>
                              <span className="inline-flex px-2">{error}</span>
                            </div>
                          </div>
              }
							{
                message && <div className="p-2 text-center">
                            <div className="inline-flex items-center bg-white leading-none text-purple-600 rounded-full p-2 shadow text-teal text-sm">
                              <span className="inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center">Cool!</span>
                              <span className="inline-flex px-2">{message}</span>
                            </div>
                          </div>
              }
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="relative">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
                  <input
                    className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="text" ref={emailRef} placeholder="Enter your e-mail" />
                </div>
                <div>
                  <button type="submit" disabled={loading}
                    className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">
                    Reset Password
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                  <Link to="/login" className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">
                    Log in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
		</div>
	);
}

export default PasswordReset;
