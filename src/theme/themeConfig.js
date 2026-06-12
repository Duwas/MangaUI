import { theme } from 'antd';

const themeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#1DB954',
    colorBgBase: '#0D0D0D',
    colorBgContainer: '#1A1A2E',
    colorBgElevated: '#252540',
    colorBgLayout: '#0D0D0D',
    colorText: '#FFFFFF',
    colorTextSecondary: '#9CA3AF',
    colorTextTertiary: '#6B7280',
    colorBorder: '#2D2D4A',
    colorBorderSecondary: '#3D3D5C',
    borderRadius: 8,
    colorError: '#EF4444',
    colorWarning: '#F59E0B',
    colorInfo: '#3B82F6',
    colorSuccess: '#1DB954',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    controlHeight: 40,
  },
  components: {
    Button: {
      primaryShadow: '0 2px 8px rgba(29, 185, 84, 0.3)',
      defaultBg: '#252540',
      defaultColor: '#FFFFFF',
      defaultBorderColor: '#2D2D4A',
    },
    Card: {
      colorBgContainer: '#1A1A2E',
      colorBorderSecondary: '#2D2D4A',
    },
    Input: {
      colorBgContainer: '#252540',
      colorBorder: '#2D2D4A',
      activeBorderColor: '#1DB954',
      hoverBorderColor: '#1DB954',
    },
    Table: {
      colorBgContainer: '#1A1A2E',
      headerBg: '#252540',
      headerColor: '#9CA3AF',
      rowHoverBg: '#252540',
      borderColor: '#2D2D4A',
    },
    Modal: {
      contentBg: '#1A1A2E',
      headerBg: '#1A1A2E',
      titleColor: '#FFFFFF',
    },
    Menu: {
      darkItemBg: '#1A1A2E',
      darkItemSelectedBg: 'rgba(29, 185, 84, 0.15)',
      darkItemSelectedColor: '#1DB954',
      darkItemHoverBg: '#252540',
    },
    Select: {
      colorBgContainer: '#252540',
      colorBorder: '#2D2D4A',
      optionSelectedBg: 'rgba(29, 185, 84, 0.15)',
    },
    Tag: {
      defaultBg: '#252540',
      defaultColor: '#9CA3AF',
    },
    Tabs: {
      inkBarColor: '#1DB954',
      itemActiveColor: '#1DB954',
      itemSelectedColor: '#1DB954',
      itemHoverColor: '#4ADE80',
    },
    Pagination: {
      itemBg: '#252540',
      itemActiveBg: '#1DB954',
    },
    Rate: {
      starColor: '#F59E0B',
    },
  },
};

export default themeConfig;
