import CurrencyInput from "react-currency-input-field";
import Icon from "@/components/Icon";
import ButtonBack from "@/components/ButtonBack";

type CashOutProps = {
    onClose: () => void;
    onContinue: () => void;
};

const CashOut = ({ onClose, onContinue }: CashOutProps) => (
    <div className="">
        <ButtonBack title="Cash out" onClick={onClose} />
        <CurrencyInput
            className="input-caret-color w-full h-40 mb-1 bg-transparent text-center text-h1 outline-none placeholder:text-theme-primary md:h-30 md:text-h2"
            name="price"
            prefix="$"
            placeholder="$0.00"
            decimalsLimit={2}
            decimalSeparator="."
            groupSeparator=","
            onValueChange={(value, name, values) =>
                console.log(value, name, values)
            }
            data-autofocus
        />
        <div className="flex items-center h-14 mb-3 px-3 border-2 border-green-400 rounded-xl">
            <Icon
                className="mr-3 fill-theme-primary"
                name="credit-card-search"
            />
            <div className="text-base-1s">•••••9911</div>
            <Icon className="ml-auto fill-primary-2" name="check-circle" />
        </div>
        <button className="btn-gray w-full mb-3">Add new card</button>
        <button className="btn-primary w-full h-14 mb-4" onClick={onContinue}>
            Continue
        </button>
        <div className="p-4 rounded-xl border border-theme-stroke bg-theme-on-surface text-caption-1 text-theme-secondary">
            To link and verify your bank account, please make a deposit. For
            your safety, withdrawals are only permitted to verified bank
            accounts.
        </div>
    </div>
);

export default CashOut;
