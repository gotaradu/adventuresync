public class Test {
    public String reverseString(String str){
        // hello ---> olleh

        // 2 pointer solution
        char start, end, aux;
        for(int i = 1; i < str.length / 2; i++){

            start = str[i - 1];
            end = str[str.length - i];

            aux = start;
            start = end;
            end = aux;

        }
    }
}
