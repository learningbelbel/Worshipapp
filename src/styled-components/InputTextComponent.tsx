interface Props {
    name: string;
    placeholder: string;
    type: string;
    onChange: (value: any) => void;
}
export const InputTextComponent = ({ name, placeholder, type, onChange }: Props) => {
    return (

        <input
            className='form-input'
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}
