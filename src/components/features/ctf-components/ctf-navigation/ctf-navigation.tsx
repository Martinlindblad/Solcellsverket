import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { NavigationFieldsFragment } from './__generated/ctf-navigation.generated';
import { getLinkDisplayText, getLinkHrefPrefix } from './utils';

import { Link } from '@src/components/shared/link';

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    alignItems: 'center',
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  menuItem: {
    alignItems: 'center',
    cursor: 'default',
    display: 'inline-flex',
    fontSize: '1.7rem',
    fontWeight: 400,
    height: '8rem',
    lineHeight: 1.9,
    marginRight: theme.spacing(8),
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(10),
    },

    '& a': {
      cursor: 'pointer',
      textTransform: 'capitalize',
      display: 'inline-block',
      transition: 'transform 0.2s ease-in-out',
    },

    '&:hover, &:focus, &:focus-within': {
      '& > a': {
        transform: 'translateY(-4px)',
      },
      '& $submenu': {
        opacity: 1,
        pointerEvents: 'all',
        transform: 'translateY(0)',
      },
    },
  },
  submenu: {
    backgroundColor: '#fff',
    boxShadow: '0 3px 6px #00000029',
    borderRadius: '14px',
    left: theme.spacing(10 * -1),
    listStyle: 'none',
    opacity: 0,
    padding: theme.spacing(4, 10),
    pointerEvents: 'none',
    position: 'absolute',
    top: 'calc(100% - 2rem)',
    transform: 'translateY(20%)',
    transition: 'all 0.3s ease-in-out',

    [theme.breakpoints.up('lg')]: {
      minWidth: '280px',
    },
  },
  submenuItem: {
    borderBottom: '1px solid #ddd',
    paddingTop: '4px',
    '&:hover, &:focus, &:focus-within': {
      '& > a': {
        transform: 'translateY(-4px)',
      },
    },
  },
}));

export const CtfNavigation = (props: NavigationFieldsFragment) => {
  const classes = useStyles();

  const navigationContent = props.items[0];

  const renderNavigationLinks = (menuGroup, listClassName) => {
    return menuGroup?.items?.map((menuItem, i) => {
      const href = getLinkHrefPrefix(menuItem);
      const linkText = getLinkDisplayText(menuItem);
      return (
        <li key={i} className={listClassName}>
          <Link href={href}>{linkText}</Link>
        </li>
      );
    });
  };

  return (
    <>
      {navigationContent?.menuItemsCollection?.items.length && (
        <nav role="navigation">
          <ul className={classes.menu}>
            {navigationContent.menuItemsCollection.items.map((menuItem, i) => (
              <li key={i} className={classes.menuItem}>
                {!menuItem?.link ? (
                  menuItem?.label
                ) : (
                  <Link href={`/${menuItem?.link?.slug}`}>{menuItem?.label}</Link>
                )}
                {!menuItem?.link && menuItem?.children && (
                  <ul className={classes.submenu}>
                    {renderNavigationLinks(menuItem.children, classes.submenuItem)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};
