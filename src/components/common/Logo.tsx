// import { BookOpen } from 'lucide-react';
// import { Link } from 'react-router-dom';

// interface LogoProps {
//   className?: string;
//   large?: boolean;
//   withText?: boolean;
// }

// const Logo: React.FC<LogoProps> = ({ className = '', large = false, withText = true }) => {
//   return (
//     <Link 
//       to="/" 
//       className={`flex items-center gap-2 ${className}`}
//     >
//       <div className={`${large ? 'p-3' : 'p-2'} rounded-md bg-primary-500 text-white`}>
//         <BookOpen size={large ? 28 : 20} strokeWidth={2.5} />
//       </div>
      
//       {withText && (
//         <div className="flex flex-col">
//           <span className={`font-bold ${large ? 'text-2xl' : 'text-xl'} text-primary-500`}>
//             Gyaan-Kriti
//           </span>
//           {large && (
//             <span className="text-sm text-gray-600">
//               Excellence in Education
//             </span>
//           )}
//         </div>
//       )}
//     </Link>
//   );
// };

// export default Logo;

import { Link } from 'react-router-dom';
import logo from './gyaan-kriti.png'; // Update this path

interface LogoProps {
  className?: string;
  large?: boolean;
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', large = false, withText = true }) => {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 ${className}`}
    >
      {/* Logo image container */}
      <div className={`${large ? 'w-16 h-16' : 'w-10 h-10'}`}>
        <img 
          src={logo} 
          alt="Gyaan-Kriti Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {withText && (
        <div className="flex flex-col">
          <span className={`font-bold ${large ? 'text-2xl' : 'text-xl'} text-primary-500`}>
            Gyaan-Kriti
          </span>
          {large && (
            <span className="text-sm text-gray-600">
              Excellence in Education
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export default Logo;