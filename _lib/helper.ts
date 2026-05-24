import { APIResponseProps } from "../components/types";

export class Helpers { 

    public validateEmail(email: string): boolean {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    public validatePassword(password: string): string[]{
        const errors = [];

        // Check if password has at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter.");
        }

        // Check if password has at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must contain at least one special character.");
        }

        // Check if password is longer than 8 characters
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }

        return errors;
    }

    public validateUsername(username: string): string[]{
        const errors = [];

        // Check if the username contains only alphanumeric characters
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            errors.push("Username must contain only alphanumeric characters.");
        }

        // Check if username is longer than 8 characters
        if (username.length < 8) {
            errors.push("Username must be at least 8 characters long.");
        }

        return errors;
    }

     public ucwords(str: string): string {
        if(str && str != ""){
            str = str.toLowerCase();
        }

        return str.replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
    }

    public GenarateRandomString(len: number = 25): string {
        const characters = 'ABCDEFGHIJKLMN209i2388jwdp8wrh989AS78GWEGAWy9008347bdioapod73623239372382309OPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    } 

    public stringToBoolean(value: string): boolean | undefined {
        if (value.toLowerCase() === 'true') return true;
        if (value.toLowerCase() === 'false') return false;
        return undefined;
    }

        
    /** ---------- toFixed without rounding Ends ------------ **/
    public toFixedNoRounding(value:any){
        var with2Decimals = value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
        return with2Decimals;
    }
    /** ---------- toFixed without rounding Ends ------------ **/

    public formatPrice(price: number): string {
        if (price >= 1000000) {
            let val = (price / 1000000).toFixed(1);
            val = val.replace(".0","");
            return val+ 'M';
        } else if (price >= 1000) {
            let val = (price / 1000).toFixed(1);
            val = val.replace(".0","");
            return val+ 'K';
        } else {
            return price.toString();
        }
    }

   public formatCurrency(value: string, remove_xeros: boolean=false) {
        if (!value) return '₦0';
        value = value.toString();
        // Remove any non-digit characters
        const cleanValue = value.replace(/[^0-9.-]/g, '');
        // Convert the cleaned value to a number
        let formattedValue = "NGN0";
        if(cleanValue && cleanValue!= ""){
            const numberValue = parseFloat(cleanValue);
            // Format the number
            formattedValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'NGN',
                // minimumFractionDigits: 2,
                // maximumFractionDigits: 2,
            }).format(numberValue);
        }else{
            formattedValue = "";
        }
        
        if(remove_xeros){
            formattedValue = formattedValue.replace(".00","")
        }

        formattedValue = formattedValue.replace("NGN", "₦")
        return formattedValue;
    }

    public format_Nigeria_PhoneNumber(number: any) {
        // Remove all non-digit characters from the input
        const cleaned = ('' + number).replace(/\D/g, '');

        // If less than 10 digits, pad with leading zeros; if more, truncate to 10 digits
        const padded = cleaned.padEnd(11, '0').substring(0, 11);

        // Format the number into (XXX) XXX-XXXX
        const formatted = padded.replace(/(\d{3})(\d{4})(\d{4})/, '($1) $2-$3');
        return formatted;
    }

    public formatNumber(value: string) {
        if (!value) return '0';
        // Remove any non-digit characters
        const cleanValue = value.replace(/\D/g, '');
        // Convert the cleaned value to a number
        let formattedValue = "0";
        if(cleanValue && cleanValue!= ""){
            const numberValue = parseFloat(cleanValue);
            // Format the number
            formattedValue = new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(numberValue);
        }else{
            formattedValue = "";
        }
        
        return formattedValue;
    }

    public formatDecimal(input: string) {
        if(input){
            input = input.replace(/[^0-9.]/g, '');
        }
        return input;
    } 

    public generateUniqueMLSNumber(nums: number, texts: number) {
        const numbers = '012345678901234567890123456789012345678901234567890123456789';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result1 = '';
        for (let i = 0; i < nums; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            result1 += numbers[randomIndex];
        }

        let result2 = '';
        for (let i = 0; i < texts; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result2 += chars[randomIndex];
        }
        return result1+"-"+result2;
    }
 

    public MakeRequest = async (payload: any) => { 

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        return await fetch(apiBaseUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),  
        }).then((resp): Promise<APIResponseProps> => {
            return resp.json();
        }).then(data => {
            return data
        })

    }

     public LoadTicketDetails = async (payload: {
        resource: string, 
        // access_token: string, 
        // admin_id: string, 
        track_type: string, 
        admin_call: string,
        // ticket_id: number,  
        ticket_number: string,  
    }) => { 

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        return await fetch(apiBaseUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then((resp): Promise<APIResponseProps> => {
            return resp.json();
        }).then(data => {
            return data
        })

    }

    public formatWholeNumber(input: string) {
        if(input){ 
            input = input?.toString()?.replace(/[^0-9]/g, '');
        }
        return input;
    }

    public formatFraction(input: string) {
        if(input){
            input = input?.toString()?.replace(/[^0-9.]/g, '');
        }
        return input;
    }

    public formatMoneyToNumber(input: string) {
        if (!input) return '0';
        if(input && input!= undefined &&input!= null){
            //input.replace(".00", "") 
            input = input?.toString()?.replace(/[^0-9.]/g, '');
        }
        return input;
    } 

    public MakeSlug = (str: string): string => {
        // Replace all non-alphanumeric characters with a hyphen
        var slug = str.replace(/[^a-zA-Z0-9-+]/g, '-');  
         slug = slug.replaceAll("--", '-').replaceAll("---", '-');  
        return slug.toLowerCase();
    }

    
    public rTrim(hay: string, niddle: string): string {
        if (hay.endsWith(niddle)) {
            return hay.slice(0, -1*niddle.length);
        }
        return hay;
    }

     public lTrim(hay: string, niddle: string): string {
        if (hay.startsWith(niddle)) {
            return hay.slice(1);
        }
        return hay;
    }
    
    public adjustColorShade(color: string, adjustment: number): string {
        // Safety guard - prevent crash when color is undefined/null
        if (!color || typeof color !== 'string') {
            console.warn(`adjustColorShade: Invalid color input. Received:`, color);
            return "gray-500"; // safe fallback
        }

        const match = color.match(/^(.+)-(\d{2,3})$/);

        if (!match) {
            console.warn(`Invalid color format: ${color}. Expected format: color-shade`);
            return color;
        }

        const [_, baseColor, shadeStr] = match;
        let shade = parseInt(shadeStr);

        shade += adjustment * 100;
        shade = Math.max(50, Math.min(950, shade));

        return `${baseColor}-${shade}`;
    }

    public adjustColorShadeByPercent(color: string, percent: number): string {
        // Safety guard
        if (!color || typeof color !== 'string') {
            console.warn(`adjustColorShadeByPercent: Invalid color input. Received:`, color);
            return "gray-500";
        }

        const match = color.match(/^(.+)-(\d{2,3})$/);

        if (!match) {
            console.warn(`Invalid color format: ${color}. Expected format: color-shade`);
            return color;
        }

        const [_, baseColor, shadeStr] = match;
        let shade = parseInt(shadeStr);

        const minShade = 50;
        const maxShade = 950;
        let normalized = (shade - minShade) / (maxShade - minShade);

        normalized += percent / 100;
        normalized = Math.max(0, Math.min(1, normalized));

        let newShade = Math.round(normalized * (maxShade - minShade) + minShade);
        newShade = this.snapToValidShade(newShade);

        return `${baseColor}-${newShade}`;
    } 

    private snapToValidShade(shade: number): number {
        // Common Tailwind shade steps
        const validShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

        return validShades.reduce((prev, curr) => 
            Math.abs(curr - shade) < Math.abs(prev - shade) ? curr : prev
        );
    }

}