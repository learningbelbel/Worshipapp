
interface Props {
  size: any
}

export const ProgressBar = ({ size = '0%' }: Props) => {
  return (
    <div className='bar-container'>
      <div className='bar-progress'>
        <div style={{
          width: size,
          backgroundColor: (size > '80%' || size === '100%') ? 'red' : 'rgb(46, 244, 32)',
          height: 5,
        }} />
      </div>
    </div>
  )
}
