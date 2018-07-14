/*
Navicat MySQL Data Transfer

Source Server         : editor
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : myroutemaker

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-06-26 21:00:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `operation_history`
-- ----------------------------
DROP TABLE IF EXISTS `operation_history`;
CREATE TABLE `operation_history` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `route_name` varchar(128) DEFAULT NULL,
  `username` varchar(64) NOT NULL,
  `oper_time` datetime NOT NULL,
  `operation` varchar(100) NOT NULL,
  `detail` text,
  `IP` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of operation_history
-- ----------------------------

-- ----------------------------
-- Table structure for `user_table`
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sz` varchar(16) NOT NULL COMMENT '服务区',
  `username` varchar(64) NOT NULL,
  `password` char(32) NOT NULL,
  `disk_space` int(10) unsigned NOT NULL DEFAULT '500' COMMENT '为用户分配的磁盘空间，单位为：MB',
  `used_space` int(10) NOT NULL DEFAULT '0' COMMENT '用户已用的空间',
  `auth_url` varchar(100) NOT NULL COMMENT '验证链接',
  `login_last_time` char(10) DEFAULT '0',
  `sessionID` char(32) DEFAULT NULL,
  `languages` varchar(1000) NOT NULL DEFAULT 'en.US' COMMENT '该公司所选择的语言列表',
  PRIMARY KEY (`id`,`sz`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_table
-- ----------------------------
