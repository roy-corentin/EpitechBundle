bits 64

section .text
global strrchr

strrchr:
    mov rax, rdi                ; get first argument
    mov cl, sil                 ; get second argument*
    jmp strlen                  ; jmp to strlen to have my rbx equal to len of the first parameter to iterate from the end

decrement:
    dec rbx

loop:
    cmp rbx, 0                  ; if rbx equal to zero the string has been check and nothing find
    je error                    ; jmp to return null
    cmp byte[rax + rbx], cl     ; compare the string + rbx with the character target
    jne decrement               ; decrement my var
    jmp find                    ; return the new string

error:
    mov rax, 0
    ret

find:
    add rax, rbx
    ret

strlen:
    xor rbx, rbx                ; Initialise rbx to 0 because it's the return value and we will return the i
    jmp check                   ; skip increment (usefull later for loop)

increment:
    inc rbx             

check:
    cmp byte[rax + rbx], 0      ; compare if the string + i == 0 so '\0'
    jne increment               ; call the function 'increment' upper to create a loop if not the end
    dec rbx
    jmp loop