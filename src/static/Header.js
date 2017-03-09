import React from 'react' 
import {Icon , Input , Button , Breadcrumb} from 'antd'
import styles from './main.css'

class Header extends React.Component {

	render () {
		return (
			<div className={styles.topWrapper}>
				<div className={styles.topHelp}>
					<img src="./img/logo_u105.png"/>
					<span className={styles.title}>(F1)春秋航空-离港系统</span>
					<div className={styles.topSearch}>
						<Icon type='right' className={styles.searchArrow}/>
						<input type='text' placeholder='请输入命令或搜索内容, 按 Enter 执行. 按 Esc 回到这里' />
						<a>执行</a>
					</div>
					<a><img src="./img/u95.png"  className={styles.imgIcon}/>108ms</a>
					<a><img src="./img/u89.png"  className={styles.imgIcon} />帮助</a>
					<a><img src="./img/u91.png"  className={styles.imgIcon}/>00001</a>
				</div>
				<div className={styles.topNotice}>
					<Breadcrumb className={styles.breadcrumb}>
						<Breadcrumb.Item><a href="#">旅客</a></Breadcrumb.Item>
						<Breadcrumb.Item><a href="#">值机</a></Breadcrumb.Item>
						<Breadcrumb.Item><a href="#">添加行李</a></Breadcrumb.Item>
					</Breadcrumb>
					<div className={styles.notificationBox}>
						<img src="./img/u418.png"  className={styles.imgIcon}/>
						<b>通知</b>
						<div>
							<span>滚动通知内容滚动通知内容滚动通知内容滚动通知内容滚动通知</span>
						</div>
						
					</div>
				</div>
			</div>
		)
	}
}

export default Header ;

