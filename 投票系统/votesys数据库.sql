/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : votesys

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2017-09-01 18:28:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_item`
-- ----------------------------
DROP TABLE IF EXISTS `t_item`;
CREATE TABLE `t_item` (
  `ID_` int(11) NOT NULL AUTO_INCREMENT,
  `VID` int(11) NOT NULL,
  `TEXT` varchar(1024) NOT NULL,
  `VCOUNT` int(11) NOT NULL,
  `OID` int(11) NOT NULL,
  PRIMARY KEY (`ID_`),
  KEY `FK_VOTE_VID` (`VID`),
  CONSTRAINT `FK_VOTE_VID` FOREIGN KEY (`VID`) REFERENCES `t_vote` (`ID_`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_item
-- ----------------------------

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `ID_` int(11) NOT NULL AUTO_INCREMENT,
  `UNAME` varchar(255) NOT NULL,
  `PSW` varchar(255) NOT NULL,
  `UROLE` int(11) NOT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', 'admin', '202cb962ac59075b964b07152d234b70', '0');

-- ----------------------------
-- Table structure for `t_uvote`
-- ----------------------------
DROP TABLE IF EXISTS `t_uvote`;
CREATE TABLE `t_uvote` (
  `ID_` int(11) NOT NULL AUTO_INCREMENT,
  `WXID` int(11) NOT NULL,
  `VID` int(11) NOT NULL,
  `VDATE` datetime NOT NULL,
  `VOTE` varchar(5000) NOT NULL,
  PRIMARY KEY (`ID_`),
  KEY `FK_UVOTE_VID` (`VID`),
  KEY `FK_WXUSER_WXID` (`WXID`),
  CONSTRAINT `FK_UVOTE_VID` FOREIGN KEY (`VID`) REFERENCES `t_vote` (`ID_`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_WXUSER_WXID` FOREIGN KEY (`WXID`) REFERENCES `t_wxuser` (`ID_`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_uvote
-- ----------------------------

-- ----------------------------
-- Table structure for `t_vote`
-- ----------------------------
DROP TABLE IF EXISTS `t_vote`;
CREATE TABLE `t_vote` (
  `ID_` int(11) NOT NULL AUTO_INCREMENT,
  `VTITLE` varchar(255) NOT NULL,
  `SRC` varchar(1024) DEFAULT NULL,
  `VSTATUS` int(11) NOT NULL,
  `START` datetime DEFAULT NULL,
  `END` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_vote
-- ----------------------------
INSERT INTO `t_vote` VALUES ('3', 'test', '', '1', '2017-09-01 18:25:28', '2017-09-01 18:25:19');

-- ----------------------------
-- Table structure for `t_wxuser`
-- ----------------------------
DROP TABLE IF EXISTS `t_wxuser`;
CREATE TABLE `t_wxuser` (
  `ID_` int(11) NOT NULL AUTO_INCREMENT,
  `OPENID` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_wxuser
-- ----------------------------
