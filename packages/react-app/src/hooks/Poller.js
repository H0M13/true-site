import { useEffect, useRef } from "react";

export default function usePoller(fn, delay, extraWatch) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = fn;
	}, [fn]);

	useEffect(() => {
		console.log("tick")
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);

	useEffect(() => {
		fn();
	}, [extraWatch]);
}
