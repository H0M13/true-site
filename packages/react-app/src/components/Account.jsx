import React from "react";
import { Button } from "antd";

export default function Account({
	web3Modal,
	loadWeb3Modal,
	logoutOfWeb3Modal,
}) {
	const modalButtons = [];
	if (web3Modal) {
		if (web3Modal.cachedProvider) {
			modalButtons.push(
				<Button
					key="logoutbutton"
					size="medium"
					onClick={logoutOfWeb3Modal}
					className="accountButton"
				>
					logout
        </Button>,
			);
		} else {
			modalButtons.push(
				<Button
					key="loginbutton"
					size="medium"
					onClick={loadWeb3Modal}
					className="accountButton"
				>
					connect
        </Button>,
			);
		}
	}

	return (
		<div>
			{modalButtons}
		</div>
	);
}
