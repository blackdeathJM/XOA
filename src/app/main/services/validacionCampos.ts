import {NumericValueType, RxwebValidators} from '@rxweb/reactive-form-validators';
import {NumberConfig} from '@rxweb/reactive-form-validators/models/config';

export const validarNum = (admitirDecimal: boolean = true, longMax: NumberConfig = null, longMin: NumberConfig = null,
                           valorMax: NumberConfig = null): Array<RxwebValidators> =>
{
    const validar = [RxwebValidators.required(), RxwebValidators.numeric({
        acceptValue: NumericValueType.PositiveNumber, allowDecimal: admitirDecimal
    })];
    if (longMax)
    {
        validar.push(RxwebValidators.maxLength(longMax));
    }
    if (longMin)
    {
        validar.push(RxwebValidators.minLength(longMin));
    }
    if (valorMax)
    {
        validar.push(RxwebValidators.maxNumber(valorMax));
    }
    return validar;
};
