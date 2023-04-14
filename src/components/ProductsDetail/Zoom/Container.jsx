import { ImageZoom } from './imageZoom'

export const Container = ({ isActive, setIsActive, imageURL }) => {
	return (
		<>
			<ImageZoom
				isActive={isActive}
				imageURL={imageURL}
				onZoom={() => setIsActive(true)}
				onClose={() => setIsActive(false)}
			/>
		</>
	)
}
