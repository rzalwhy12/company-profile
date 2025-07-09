'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Users,
  CreditCard,
  Calculator,
  BookOpen,
  LogIn,
  ClipboardList
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib//redux/hooks';
import { setSignIn, setSignOut } from '@/lib/redux/features/userSlice';
import { apiCall } from '@/helper/apiCall';
import { toast } from 'react-toastify';

// Define types for your navigation links to improve type safety
interface SubSubSubLink {
  href: string;
  label: string;
}

interface SubSubLink {
  href?: string; // href is optional for parent items that just expand
  label: string;
  subSubSubLinks?: SubSubSubLink[];
}

interface SubLink {
  label: string;
  href?: string; // href is optional for parent items that just expand
  subSubLinks?: SubSubLink[];
}

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
  subLinks?: SubLink[];
}

// MobileMenuItem Component (Recursive)
interface MobileMenuItemProps {
  item: NavLink | SubLink | SubSubLink | SubSubSubLink;
  level: number;
  onCloseNav: () => void;
  router: ReturnType<typeof useRouter>;
  searchParams: ReturnType<typeof useSearchParams>;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ item, level, onCloseNav, router, searchParams }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Type guards to check if an item has specific sub-items
  const hasSubLinks = (item: NavLink | SubLink | SubSubLink | SubSubSubLink): item is NavLink => 'subLinks' in item && !!item.subLinks && item.subLinks.length > 0;
  const hasSubSubLinks = (item: NavLink | SubLink | SubSubLink | SubSubSubLink): item is SubLink => 'subSubLinks' in item && !!item.subSubLinks && item.subSubLinks.length > 0;
  const hasSubSubSubLinks = (item: NavLink | SubLink | SubSubLink | SubSubSubLink): item is SubSubLink => 'subSubSubLinks' in item && !!item.subSubSubLinks && item.subSubSubLinks.length > 0;

  const hasSubItems = hasSubLinks(item) || hasSubSubLinks(item) || hasSubSubSubLinks(item);

  let subItems: (NavLink | SubLink | SubSubLink | SubSubSubLink)[] = [];
  if (hasSubLinks(item)) {
    subItems = item.subLinks || [];
  } else if (hasSubSubLinks(item)) {
    subItems = item.subSubLinks || [];
  } else if (hasSubSubSubLinks(item)) {
    subItems = item.subSubSubLinks || [];
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const linkHref = 'href' in item && item.href ? item.href : undefined;

  const handleLinkClick = (e: React.MouseEvent) => {
    if (linkHref === '#') {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else if (linkHref) {
      if (linkHref.startsWith('/saving-loan?tab=')) {
        const url = new URL(linkHref, window.location.origin);
        const tabParam = url.searchParams.get('tab');
        if (tabParam) {
          router.push(`/saving-loan?tab=${tabParam}`, { scroll: false });
        }
      } else {
        router.push(linkHref, { scroll: false });
      }
      onCloseNav(); // Close mobile nav after clicking a link
    }
  };

  return (
    <div>
      <div className={`flex items-center justify-between py-2 rounded-md font-medium text-white hover:text-gray-200 hover:bg-gray-800/10 transition-colors duration-200`}
        style={{ paddingLeft: `${16 + level * 10}px` }}>
        {linkHref ? (
          <Link href={linkHref} className="flex items-center space-x-2 flex-grow" onClick={handleLinkClick}>
            {'icon' in item && item.icon && <item.icon className="h-5 w-5" />}
            <span>{item.label}</span>
          </Link>
        ) : (
          <div className="flex items-center space-x-2 flex-grow">
            {'icon' in item && item.icon && <item.icon className="h-5 w-5" />}
            <span>{item.label}</span>
          </div>
        )}

        {hasSubItems && (
          // Toggle button for sub-items, always prevent default
          <button onClick={handleToggle} className="p-1 -mr-1">
            {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        )}
      </div>

      {hasSubItems && isExpanded && (
        <div className="pl-4">
          {subItems.map((subItem: NavLink | SubLink | SubSubLink | SubSubSubLink, index: number) => (
            <MobileMenuItem
              key={subItem.label + index}
              item={subItem}
              level={level + 1}
              onCloseNav={onCloseNav}
              router={router}
              searchParams={searchParams}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState<string | null>(null);

  const menuLeaveTimeout = useRef<NodeJS.Timeout | null>(null);
  const subMenuLeaveTimeout = useRef<NodeJS.Timeout | null>(null);
  const subSubMenuLeaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();
  const userMail = useAppSelector((state) => state.userReducer.email);

  useEffect(() => {
    const keepLogin = async () => {
      const tkn = localStorage.getItem("tkn");
      if (!tkn) return;

      try {
        const res = await apiCall.get(`/accounts/${tkn}`);
        dispatch(setSignIn(res.data));
      } catch (err) {
        console.error("Keep login failed:", err);
        dispatch(setSignOut());
        localStorage.removeItem("tkn");
      }
    };
    keepLogin();
  }, [dispatch]);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { href: '/', label: 'Home', icon: Home },
    {
      href: '/about/mission-statement',
      label: 'About us',
      icon: Users,
      subLinks: [
        { href: '/about/mission-statement', label: 'Mission Statement, Values & Company Motto' },
        { href: '/about/customer-complaints', label: 'Customer Complaints' },
        { href: '/about/office-locations', label: 'Office Branch Locations' },
      ],
    },
    {
      href: '/saving-loan?tab=saving-product',
      label: 'Services',
      icon: CreditCard,
      subLinks: [
        {
          href: '/saving-loan?tab=saving-product',
          label: 'Savings',
          subSubLinks: [
            { href: '/saving-loan?tab=saving-product', label: 'Regular Savings' },
            { href: '/saving-loan?tab=saving-product', label: 'Term Savings' },
            { href: '/saving-loan?tab=saving-product', label: 'Time deposit' },
          ],
        },
        {
          href: '/saving-loan?tab=financing-product',
          label: 'Loans',
          subSubLinks: [
            { href: '/saving-loan?tab=financing-product', label: 'Working Capital Credit' },
            { href: '/saving-loan?tab=financing-product', label: 'Consumer Credit' },
            { href: '/saving-loan?tab=financing-product', label: 'Investment credit' },
            { href: '/saving-loan/loans/loan-application-form', label: 'Loan Application Form' },
          ],
        },
      ],
    },
    {
      href: '/publication?section=report',
      label: 'Publication',
      icon: ClipboardList,
      subLinks: [
        {
          href: '/publication?section=report',
          label: 'Report',
          subSubLinks: [
            {
              href: '/publication?section=financial-report',
              label: 'Financial Report',
            },
            { href: '/publication?section=annual-report', label: 'Annual Report' },
          ],
        },
        { href: '/publication?section=idic-lps', label: 'IDIC / LPS' },
        { href: '/publication?section=information', label: 'Information' },
      ],
    },
    { href: '/Contact', label: 'Contact', icon: Calculator },
    { href: '/blog', label: 'Blog', icon: BookOpen },
  ];

  const handleMouseEnter = (menuLabel: string) => {
    if (menuLeaveTimeout.current) {
      clearTimeout(menuLeaveTimeout.current);
      menuLeaveTimeout.current = null;
    }
    setActiveMenu(menuLabel);
    setActiveSubMenu(null);
    setActiveSubSubMenu(null);
  };

  const handleMouseLeave = () => {
    menuLeaveTimeout.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubMenu(null);
      setActiveSubSubMenu(null);
    }, 200);
  };

  const handleSubMouseEnter = (subLabel: string) => {
    if (subMenuLeaveTimeout.current) {
      clearTimeout(subMenuLeaveTimeout.current);
      subMenuLeaveTimeout.current = null;
    }
    setActiveSubMenu(subLabel);
    setActiveSubSubMenu(null);
  };

  const handleSubMouseLeave = () => {
    subMenuLeaveTimeout.current = setTimeout(() => {
      setActiveSubMenu(null);
      setActiveSubSubMenu(null);
    }, 200);
  };

  const handleSubSubMouseEnter = (subSubLabel: string) => {
    if (subSubMenuLeaveTimeout.current) {
      clearTimeout(subSubMenuLeaveTimeout.current);
      subSubMenuLeaveTimeout.current = null;
    }
    setActiveSubSubMenu(subSubLabel);
  };

  const handleSubSubMouseLeave = () => {
    subSubMenuLeaveTimeout.current = setTimeout(() => {
      setActiveSubSubMenu(null);
    }, 200);
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/' && !searchParams.get('tab');
    }
    if (href.startsWith('/saving-loan?tab=')) {
      const url = new URL(href, window.location.origin);
      const targetTab = url.searchParams.get('tab');
      return pathname === '/saving-loan' && searchParams.get('tab') === targetTab;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300
      ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'lg:bg-transparent lg:text-white bg-white/80 backdrop-blur-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <div className={`relative p-1.5 rounded-lg transition-colors duration-300
                ${scrolled ? 'bg-white' : 'lg:bg-white bg-transparent'}`}>
                <Image
                  src="/image/Logo-HD-new-19cm.png"
                  alt="Logo SDA"
                  width={100}
                  height={20}
                  className="w-[120px] h-[30px] md:w-[150px] md:h-[40px] lg:w-[150px] lg:h-[40px]"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center md:space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={link.href}
                  className={`flex items-center px-2 py-2 rounded-md md:text-sm lg:text-base font-light transition-all duration-200
                    ${scrolled ? 'text-gray-800' : 'text-white'}
                    ${isActiveLink(link.href) ? 'font-bold text-blue-600' : 'hover:bg-gray-100 hover:text-blue-600'}`}
                >
                  {link.label}
                  {link.subLinks && <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />}
                </Link>

                {/* Dropdown for subLinks (Desktop) */}
                {link.subLinks && (
                  <div
                    className={`absolute left-0 mt-2 w-60 bg-white rounded-md shadow-lg py-2
                                transition-all duration-300 ease-out
                                ${activeMenu === link.label ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}
                                z-50`}
                  >
                    {link.subLinks.map((subLink) => (
                      <div
                        key={subLink.label}
                        className="relative group"
                        onMouseEnter={() => subLink.subSubLinks && handleSubMouseEnter(subLink.label)}
                        onMouseLeave={() => subLink.subSubLinks && handleSubMouseLeave()}
                      >
                        <Link
                          href={subLink.href || '#'}
                          className={`flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600
                                      ${isActiveLink(subLink.href || '') ? 'font-semibold text-blue-600 bg-gray-50' : ''}`}
                          onClick={(e) => {
                            if (subLink.href === '#') {
                              e.preventDefault();
                            }
                          }}
                        >
                          {subLink.label}
                          {subLink.subSubLinks && <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />}
                        </Link>

                        {/* Side Dropdown for subSubLinks (Desktop) */}
                        {subLink.subSubLinks && (
                          <div
                            className={`absolute left-full top-0 mt-0 ml-2 w-60 bg-white rounded-md shadow-lg py-2
                                          transition-all duration-300 ease-out
                                          ${activeSubMenu === subLink.label ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-2 invisible'}
                                          z-50`}
                          >
                            {subLink.subSubLinks.map((subSubLink) => (
                              <div
                                key={subSubLink.label}
                                className="relative group"
                                onMouseEnter={() => subSubLink.subSubSubLinks && handleSubSubMouseEnter(subSubLink.label)}
                                onMouseLeave={() => subSubLink.subSubSubLinks && handleSubSubMouseLeave()}
                              >
                                <Link
                                  href={subSubLink.href || '#'}
                                  className={`flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600
                                              ${isActiveLink(subSubLink.href || '') ? 'font-semibold text-blue-600 bg-gray-50' : ''}`}
                                  onClick={(e) => {
                                    if (subSubLink.href === '#') {
                                      e.preventDefault();
                                    }
                                  }}
                                >
                                  {subSubLink.label}
                                  {subSubLink.subSubSubLinks && <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />}
                                </Link>

                                {/* Third-level Side Dropdown for subSubSubLinks (Desktop) */}
                                {subSubLink.subSubSubLinks && activeSubSubMenu === subSubLink.label && (
                                  <div
                                    className={`absolute left-full top-0 mt-0 ml-2 w-60 bg-white rounded-md shadow-lg py-2
                                                  transition-all duration-300 ease-out
                                                  ${activeSubSubMenu === subSubLink.label ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-2 invisible'}
                                                  z-50`}
                                  >
                                    {subSubLink.subSubSubLinks.map((thirdLevelLink) => (
                                      <Link
                                        key={thirdLevelLink.label}
                                        href={thirdLevelLink.href}
                                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600
                                                    ${isActiveLink(thirdLevelLink.href) ? 'font-semibold text-blue-600 bg-gray-50' : ''}`}
                                      >
                                        {thirdLevelLink.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center md:space-x-2 lg:space-x-3">
            {userMail ? (
              <button
                type="button"
                onClick={() => {
                  dispatch(setSignOut());
                  localStorage.removeItem("tkn");
                  toast.success("You have been signed out."); 
                }}
                className={`flex items-center space-x-1 md:px-3 md:py-1 lg:px-4 lg:py-2 rounded-lg transition-all duration-300 hover:bg-gray-100
                  ${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-700'}
                  ${isActiveLink('/sign-in') ? 'font-bold text-blue-600' : ''}`}
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/sign-in"
                className={`flex items-center space-x-1 md:px-3 md:py-1 lg:px-4 lg:py-2 rounded-lg transition-all duration-300 hover:bg-gray-100
                  ${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-700'}
                  ${isActiveLink('/sign-in') ? 'font-bold text-blue-600' : ''}`}
              >
                <LogIn className="md:h-3 md:w-3 lg:h-4 lg:w-4" />
                <span className="md:text-xs lg:text-sm font-medium">Log In</span>
              </Link>
            )}
          </div>

          {/* Mobile Login / Sign Out + Hamburger */}
          <div className="lg:hidden flex items-center space-x-2">
            {userMail ? (

              <button
                type="button"
                onClick={() => {
                  dispatch(setSignOut());
                  localStorage.removeItem("tkn");
                  toast.success("You have been signed out."); 
                }}
                className="flex items-center space-x-1 px-2 py-1 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-gray-100 text-xs"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="flex items-center space-x-1 px-2 py-1 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-gray-100 text-xs"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-800 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-y-auto bg-blue-900/95 backdrop-blur-md`}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <MobileMenuItem
                key={link.label}
                item={link}
                level={0}
                onCloseNav={() => setIsOpen(false)}
                router={router}
                searchParams={searchParams}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;