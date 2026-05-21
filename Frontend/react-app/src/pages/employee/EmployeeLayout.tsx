import { NavLink, Outlet } from 'react-router-dom';
import logoImg from '../../images/nurb.png';

const navItems = [
  {
    to: '/employee',
    end: true,
    label: 'Дашборд',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    to: '/employee/orders',
    label: 'Заказы',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 3h12v14H4V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: '/employee/clients',
    label: 'Клиенты',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="15" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 18c0-2.5-1.8-4.5-4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function EmployeeLayout() {
  return (
    <div className="emp-layout">
      <aside className="emp-sidebar">
        <div className="emp-sidebar__header">
          <a href="/" className="emp-sidebar__logo">
            <img src={logoImg} className="emp-sidebar__logo-img" />
            <span>PitStop</span>
          </a>
        </div>
        <nav className="emp-sidebar__nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `emp-sidebar__link ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="emp-sidebar__footer">
          <div className="emp-sidebar__user">
            <div className="emp-sidebar__avatar">A</div>
            <div className="emp-sidebar__user-info">
              <span className="emp-sidebar__user-name">Администратор</span>
              <span className="emp-sidebar__user-role">Сотрудник</span>
            </div>
          </div>
          <a href="/" className="emp-sidebar__logout">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 15H3a1 1 0 01-1-1V4a1 1 0 011-1h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 12l3-3-3-3M15 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </aside>
      <div className="emp-main">
        <Outlet />
      </div>
    </div>
  );
}
