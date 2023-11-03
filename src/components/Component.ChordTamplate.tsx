export const ChordTamplate = ({ rowData }: any) => {
    return (
        <>
            {rowData.chord.map((chord: any, i: any) => {
                return <span key={i} style={{ display: 'block' }}>{chord}</span>
            })}
        </>
    )
}
